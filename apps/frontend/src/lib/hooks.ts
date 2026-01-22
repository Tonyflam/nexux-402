'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  fetchProtocolStats, 
  fetchRecentEvents,
  getProvider,
  CONTRACTS,
  CRONOS_EXPLORER,
  formatAddress,
} from './contracts';

// Hook for real-time protocol stats
export function useProtocolStats() {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalCalls: 0,
    totalVolume: '0.00',
    blockNumber: 0,
    chainId: 338,
    contracts: CONTRACTS,
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await fetchProtocolStats();
        if (mounted) {
          setStats(prev => ({ ...prev, ...data, loading: false }));
        }
      } catch (error) {
        if (mounted) {
          setStats(prev => ({ ...prev, loading: false, error: 'Failed to fetch stats' }));
        }
      }
    }

    load();
    const interval = setInterval(load, 15000); // Refresh every 15s

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return stats;
}

// Hook for recent blockchain events
export function useRecentEvents(count: number = 10) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await fetchRecentEvents(count);
        if (mounted) {
          setEvents(data);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();
    const interval = setInterval(load, 30000); // Refresh every 30s

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [count]);

  return { events, loading };
}

// Hook for block subscription
export function useBlockNumber() {
  const [blockNumber, setBlockNumber] = useState(0);

  useEffect(() => {
    const provider = getProvider();
    
    provider.getBlockNumber().then(setBlockNumber);

    // Subscribe to new blocks
    provider.on('block', setBlockNumber);

    return () => {
      provider.off('block', setBlockNumber);
    };
  }, []);

  return blockNumber;
}

// Hook for wallet connection (without RainbowKit dependency)
export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    setConnecting(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setAddress(accounts[0]);
      
      const chainIdHex = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      setChainId(parseInt(chainIdHex, 16));

      // Switch to Cronos Testnet if not on it
      if (parseInt(chainIdHex, 16) !== 338) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x152' }], // 338 in hex
          });
        } catch (switchError: any) {
          // If chain not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x152',
                chainName: 'Cronos Testnet',
                nativeCurrency: { name: 'Cronos', symbol: 'TCRO', decimals: 18 },
                rpcUrls: ['https://evm-t3.cronos.org'],
                blockExplorerUrls: ['https://explorer.cronos.org/testnet'],
              }],
            });
          }
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setChainId(null);
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      setAddress(accounts[0] || null);
    };

    const handleChainChanged = (chainIdHex: string) => {
      setChainId(parseInt(chainIdHex, 16));
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    window.ethereum?.on('chainChanged', handleChainChanged);

    // Check if already connected
    window.ethereum?.request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          window.ethereum?.request({ method: 'eth_chainId' })
            .then((chainIdHex: string) => setChainId(parseInt(chainIdHex, 16)));
        }
      });

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return {
    address,
    chainId,
    connecting,
    isConnected: !!address,
    isCorrectChain: chainId === 338,
    connect,
    disconnect,
    formatAddress: address ? formatAddress(address) : null,
  };
}

// Ethereum window type
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

// Hook for fetching registered agents from blockchain
export function useAgents() {
  const [agents, setAgents] = useState<Array<{
    id: string;
    name: string;
    description: string;
    owner: string;
    paymentAddress: string;
    endpoint: string;
    capabilities: string[];
    pricePerCall: number;
    price: string; // Alias for convenience
    totalCalls: number;
    totalRevenue: number;
    rating: number;
    isActive: boolean;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAgents() {
      try {
        const provider = getProvider();
        const { ethers } = await import('ethers');
        
        // NexusRegistry ABI for reading agents
        const REGISTRY_ABI = [
          'function getAllAgents() view returns (bytes32[])',
          'function getAgent(bytes32 agentId) view returns (tuple(address owner, address paymentAddress, string metadataUri, string[] capabilities, uint256 pricePerCall, uint256 totalCalls, uint256 totalRevenue, uint256 rating, uint256 ratingCount, bool isActive, uint256 createdAt, uint256 lastActiveAt))',
        ];
        
        const registry = new ethers.Contract(CONTRACTS.NEXUS_REGISTRY, REGISTRY_ABI, provider);
        
        // Get all agent IDs
        const agentIds = await registry.getAllAgents();
        
        if (agentIds.length === 0) {
          if (mounted) {
            setAgents([]);
            setLoading(false);
          }
          return;
        }
        
        // Fetch all agents
        const agentPromises = agentIds.map((id: string) => 
          registry.getAgent(id).catch(() => null)
        );
        
        const agentData = await Promise.all(agentPromises);
        
        if (mounted) {
          const formattedAgents = agentData
            .filter(a => a !== null)
            .map((agent, index) => {
              // Parse metadata URI (it's a JSON string)
              let metadata = { name: 'Unknown', description: '', endpoint: '' };
              try {
                metadata = JSON.parse(agent.metadataUri);
              } catch {
                // If not JSON, use raw string
                metadata.name = agent.metadataUri.slice(0, 50);
              }
              
              const priceFormatted = ethers.formatUnits(agent.pricePerCall, 6);
              
              return {
                id: agentIds[index],
                name: metadata.name || 'Unknown Agent',
                description: metadata.description || '',
                owner: agent.owner,
                paymentAddress: agent.paymentAddress,
                endpoint: metadata.endpoint || '',
                capabilities: agent.capabilities || [],
                pricePerCall: Number(priceFormatted),
                price: priceFormatted, // Alias for convenience
                totalCalls: Number(agent.totalCalls),
                totalRevenue: Number(ethers.formatUnits(agent.totalRevenue, 6)),
                rating: Number(agent.rating) / 100, // Rating is stored as 0-500, display as 0-5.0
                isActive: agent.isActive,
              };
            });
          
          setAgents(formattedAgents);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Failed to fetch agents:', err);
        if (mounted) {
          setError(err.message);
          setLoading(false);
          // Fallback to API
          try {
            const res = await fetch('/api/agents?limit=20');
            const data = await res.json();
            setAgents(data.agents || []);
          } catch {
            // Ignore API fallback error
          }
        }
      }
    }

    fetchAgents();
    const interval = setInterval(fetchAgents, 30000); // Refresh every 30s

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { agents, loading, error };
}
