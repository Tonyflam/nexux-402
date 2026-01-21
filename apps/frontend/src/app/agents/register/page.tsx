'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { 
  Bot, 
  ArrowRight, 
  CheckCircle, 
  Loader2,
  ExternalLink,
  AlertCircle,
  DollarSign,
  Tag,
  FileText,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/lib/hooks';
import { CONTRACTS, CRONOS_EXPLORER, getProvider } from '@/lib/contracts';
import { ethers } from 'ethers';

const CAPABILITY_OPTIONS = [
  { id: 'defi', label: 'DeFi', description: 'Decentralized finance operations' },
  { id: 'payments', label: 'Payments', description: 'Payment processing and transfers' },
  { id: 'analytics', label: 'Analytics', description: 'Data analysis and insights' },
  { id: 'trading', label: 'Trading', description: 'Trading strategies and execution' },
  { id: 'data-oracle', label: 'Data Oracle', description: 'External data feeds' },
  { id: 'automation', label: 'Automation', description: 'Task automation and scheduling' },
  { id: 'security', label: 'Security', description: 'Security monitoring and auditing' },
  { id: 'rwa', label: 'RWA', description: 'Real-world assets' },
];

// NexusRegistry ABI for registration
const REGISTRY_ABI = [
  'function registerAgent(string metadataUri, string[] capabilities, uint256 pricePerCall, address paymentAddress) returns (bytes32)',
  'event AgentRegistered(bytes32 indexed agentId, address indexed owner, string metadataUri)',
];

export default function RegisterAgentPage() {
  const { address, isConnected, connect } = useWallet();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    endpoint: '',
    pricePerCall: '0.10',
    capabilities: [] as string[],
  });

  const handleCapabilityToggle = (capId: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(capId)
        ? prev.capabilities.filter(c => c !== capId)
        : [...prev.capabilities, capId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      await connect();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get signer from MetaMask
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Create contract instance
      const registry = new ethers.Contract(CONTRACTS.NEXUS_REGISTRY, REGISTRY_ABI, signer);
      
      // Convert price to wei (assuming 6 decimals for USDC pricing)
      const priceInWei = ethers.parseUnits(formData.pricePerCall, 6);
      
      // Create metadata URI as JSON
      const metadataUri = JSON.stringify({
        name: formData.name,
        description: formData.description,
        endpoint: formData.endpoint,
        version: '1.0.0',
      });
      
      // Register agent on-chain
      const tx = await registry.registerAgent(
        metadataUri,
        formData.capabilities,
        priceInWei,
        address // paymentAddress
      );
      
      setTxHash(tx.hash);
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      // Try to extract agent ID from event logs
      for (const log of receipt.logs) {
        try {
          const parsed = registry.interface.parseLog(log);
          if (parsed?.name === 'AgentRegistered') {
            setAgentId(parsed.args[0].toString());
            break;
          }
        } catch {
          // Skip logs that don't match
        }
      }
      
      setSuccess(true);
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.message || 'Failed to register agent');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-green-400">Agent Registered!</h1>
            <p className="text-white/70 mb-6">
              Your agent "{formData.name}" has been successfully registered on the Cronos blockchain.
            </p>
            
            {agentId && (
              <div className="glass rounded-xl p-4 mb-6 inline-block">
                <span className="text-white/60 text-sm">Agent ID:</span>
                <span className="text-2xl font-bold text-cronos-light ml-2">#{agentId}</span>
              </div>
            )}

            {txHash && (
              <div className="glass rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white/60 text-sm">Transaction:</span>
                  <code className="text-xs text-cronos-light">{txHash.slice(0, 16)}...{txHash.slice(-8)}</code>
                  <a 
                    href={`${CRONOS_EXPLORER}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cronos-light hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <Link href="/agents" className="btn-secondary">
                View All Agents
              </Link>
              <Link href="/x402-demo" className="btn-primary flex items-center gap-2">
                Try x402 Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/agents" className="text-cronos-light hover:underline text-sm mb-4 inline-block">
            ← Back to Agents
          </Link>
          <h1 className="text-3xl font-bold">Register New Agent</h1>
          <p className="text-white/60 mt-2">
            Register your AI agent on-chain to make it discoverable and enable x402 payments.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Tag className="w-4 h-4 text-cronos-light" />
              Agent Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., DeFi Price Oracle"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cronos-light focus:outline-none transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <FileText className="w-4 h-4 text-cronos-light" />
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what your agent does..."
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cronos-light focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Endpoint */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <LinkIcon className="w-4 h-4 text-cronos-light" />
              API Endpoint *
            </label>
            <input
              type="url"
              value={formData.endpoint}
              onChange={(e) => setFormData(prev => ({ ...prev, endpoint: e.target.value }))}
              placeholder="https://api.example.com/agent"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cronos-light focus:outline-none transition-colors"
            />
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <DollarSign className="w-4 h-4 text-cronos-light" />
              Price per Call (USDC) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.pricePerCall}
              onChange={(e) => setFormData(prev => ({ ...prev, pricePerCall: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cronos-light focus:outline-none transition-colors"
            />
          </div>

          {/* Capabilities */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Bot className="w-4 h-4 text-cronos-light" />
              Capabilities *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CAPABILITY_OPTIONS.map(cap => (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => handleCapabilityToggle(cap.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    formData.capabilities.includes(cap.id)
                      ? 'bg-cronos-light/20 border-cronos-light text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                  }`}
                >
                  <div className="font-medium">{cap.label}</div>
                  <div className="text-xs text-white/50">{cap.description}</div>
                </button>
              ))}
            </div>
            {formData.capabilities.length === 0 && (
              <p className="text-xs text-yellow-400 mt-2">Please select at least one capability</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Contract Info */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Registering to:</span>
              <a 
                href={`${CRONOS_EXPLORER}/address/${CONTRACTS.NEXUS_REGISTRY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cronos-light hover:underline flex items-center gap-1"
              >
                NexusRegistry <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-white/60">Network:</span>
              <span className="text-white">Cronos Testnet</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || formData.capabilities.length === 0}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {txHash ? 'Confirming...' : 'Registering...'}
              </>
            ) : !isConnected ? (
              <>Connect Wallet to Register</>
            ) : (
              <>
                <Bot className="w-5 h-5" />
                Register Agent On-Chain
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
