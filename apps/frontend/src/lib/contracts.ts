import { ethers } from 'ethers';

// Deployed contract addresses on Cronos Testnet
export const CONTRACTS = {
  NEXUS_REGISTRY: '0xABA74d14F489F572ed6520950c7D2059F70F2444',
  WORKFLOW_ENGINE: '0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938',
  PAYMENT_ROUTER: '0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C',
  AGENT_MARKETPLACE: '0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81',
  USDC: '0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a',
} as const;

// Cronos Testnet RPC
export const CRONOS_TESTNET_RPC = 'https://evm-t3.cronos.org';
export const CRONOS_CHAIN_ID = 338;
export const CRONOS_EXPLORER = 'https://explorer.cronos.org/testnet';

// Cronos Testnet config object
export const CRONOS_TESTNET = {
  name: 'Cronos Testnet',
  chainId: 338,
  rpcUrl: 'https://evm-t3.cronos.org',
  blockExplorer: 'https://explorer.cronos.org/testnet',
  currency: 'TCRO',
} as const;

// ABIs (simplified for frontend)
export const NEXUS_REGISTRY_ABI = [
  'function registerAgent(string metadataUri, string[] capabilities, uint256 pricePerCall, address paymentAddress) returns (bytes32)',
  'function getAgent(bytes32 agentId) view returns (tuple(address owner, address paymentAddress, string metadataUri, string[] capabilities, uint256 pricePerCall, uint256 totalCalls, uint256 totalRevenue, uint256 rating, uint256 ratingCount, bool isActive, uint256 createdAt, uint256 lastActiveAt))',
  'function isAgentActive(bytes32 agentId) view returns (bool)',
  'function recordCall(bytes32 agentId)',
  'function rateAgent(bytes32 agentId, uint8 rating)',
  'function getStats() view returns (uint256, uint256, uint256)',
  'function getAllAgents() view returns (bytes32[])',
  'function allAgentIds(uint256) view returns (bytes32)',
  'event AgentRegistered(bytes32 indexed agentId, address indexed owner, string metadataUri)',
  'event AgentCalled(bytes32 indexed agentId, address indexed caller, uint256 payment)',
  'event AgentRated(bytes32 indexed agentId, address indexed rater, uint8 rating)',
];

export const WORKFLOW_ENGINE_ABI = [
  'function createWorkflow(string name, string description, tuple(bytes32 id, uint8 stepType, bytes config, bytes32 nextStepOnSuccess, bytes32 nextStepOnFailure)[] steps) returns (bytes32)',
  'function executeWorkflow(bytes32 workflowId) returns (bytes32)',
  'function getWorkflow(bytes32 workflowId) view returns (tuple(bytes32 id, address owner, string name, string description, bool isActive, uint256 totalExecutions, uint256 successfulExecutions, uint256 totalGasUsed, uint256 createdAt, uint256 lastExecutedAt))',
  'function totalWorkflows() view returns (uint256)',
  'event WorkflowCreated(bytes32 indexed workflowId, address indexed owner, string name)',
  'event WorkflowExecuted(bytes32 indexed workflowId, bytes32 indexed executionId, bool success)',
];

export const PAYMENT_ROUTER_ABI = [
  'function processPayment(address recipient, uint256 amount, bytes32 referenceId, bytes signature)',
  'function createPaymentStream(address recipient, uint256 totalAmount, uint256 duration) returns (bytes32)',
  'function claimStream(bytes32 streamId)',
  'function splitPayment(address[] recipients, uint256[] amounts, bytes32 referenceId)',
  'function totalPayments() view returns (uint256)',
  'function totalStreamedVolume() view returns (uint256)',
  'event PaymentProcessed(bytes32 indexed referenceId, address indexed from, address indexed to, uint256 amount)',
  'event StreamCreated(bytes32 indexed streamId, address indexed sender, address indexed recipient, uint256 totalAmount)',
  'event StreamClaimed(bytes32 indexed streamId, uint256 amount)',
];

export const AGENT_MARKETPLACE_ABI = [
  'function listService(bytes32 agentId, string name, string description, uint256 price, uint256 duration) returns (bytes32)',
  'function purchaseService(bytes32 listingId)',
  'function completeOrder(bytes32 orderId)',
  'function disputeOrder(bytes32 orderId, string reason)',
  'function totalListings() view returns (uint256)',
  'function totalOrders() view returns (uint256)',
  'function totalMarketVolume() view returns (uint256)',
  'event ServiceListed(bytes32 indexed listingId, bytes32 indexed agentId, string name, uint256 price)',
  'event ServicePurchased(bytes32 indexed orderId, bytes32 indexed listingId, address indexed buyer)',
  'event OrderCompleted(bytes32 indexed orderId)',
];

// Get read-only provider
export function getProvider() {
  return new ethers.JsonRpcProvider(CRONOS_TESTNET_RPC);
}

// Get contract instances
export function getRegistryContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
  const provider = signerOrProvider || getProvider();
  return new ethers.Contract(CONTRACTS.NEXUS_REGISTRY, NEXUS_REGISTRY_ABI, provider);
}

export function getWorkflowContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
  const provider = signerOrProvider || getProvider();
  return new ethers.Contract(CONTRACTS.WORKFLOW_ENGINE, WORKFLOW_ENGINE_ABI, provider);
}

export function getPaymentContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
  const provider = signerOrProvider || getProvider();
  return new ethers.Contract(CONTRACTS.PAYMENT_ROUTER, PAYMENT_ROUTER_ABI, provider);
}

export function getMarketplaceContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
  const provider = signerOrProvider || getProvider();
  return new ethers.Contract(CONTRACTS.AGENT_MARKETPLACE, AGENT_MARKETPLACE_ABI, provider);
}

// Utility functions
export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatUSDC(amount: bigint): string {
  return (Number(amount) / 1e6).toFixed(2);
}

export function getExplorerUrl(type: 'address' | 'tx', value: string): string {
  return `${CRONOS_EXPLORER}/${type}/${value}`;
}

// Fetch real blockchain stats
export async function fetchProtocolStats() {
  const provider = getProvider();
  const registry = getRegistryContract(provider);

  try {
    const [
      stats,
      blockNumber,
    ] = await Promise.all([
      registry.getStats().catch(() => [BigInt(0), BigInt(0), BigInt(0)]),
      provider.getBlockNumber(),
    ]);

    const [totalAgents, totalCalls, totalVolume] = stats;

    return {
      totalAgents: Number(totalAgents),
      totalCalls: Number(totalCalls),
      totalVolume: formatUSDC(totalVolume),
      blockNumber,
      chainId: CRONOS_CHAIN_ID,
      contracts: CONTRACTS,
    };
  } catch (error) {
    console.error('Error fetching protocol stats:', error);
    return {
      totalAgents: 0,
      totalCalls: 0,
      totalVolume: '0.00',
      blockNumber: 0,
      chainId: CRONOS_CHAIN_ID,
      contracts: CONTRACTS,
    };
  }
}

// Fetch recent events
export async function fetchRecentEvents(count: number = 10) {
  const provider = getProvider();
  const registry = getRegistryContract(provider);
  
  try {
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 10000); // Last ~10k blocks
    
    const [registeredEvents, callEvents, ratingEvents] = await Promise.all([
      registry.queryFilter(registry.filters.AgentRegistered(), fromBlock),
      registry.queryFilter(registry.filters.AgentCalled(), fromBlock),
      registry.queryFilter(registry.filters.AgentRated(), fromBlock),
    ]);

    const allEvents = [
      ...registeredEvents.map(e => ({ type: 'REGISTERED', ...e })),
      ...callEvents.map(e => ({ type: 'CALLED', ...e })),
      ...ratingEvents.map(e => ({ type: 'RATED', ...e })),
    ].sort((a, b) => (b.blockNumber || 0) - (a.blockNumber || 0))
     .slice(0, count);

    return allEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
