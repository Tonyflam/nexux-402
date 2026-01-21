import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log('Registering sample agents with account:', deployer.address);
  console.log('Account balance:', (await ethers.provider.getBalance(deployer.address)).toString());

  // Get deployed NexusRegistry contract
  const NEXUS_REGISTRY = '0xABA74d14F489F572ed6520950c7D2059F70F2444';
  
  const NexusRegistry = await ethers.getContractFactory('NexusRegistry');
  const registry = NexusRegistry.attach(NEXUS_REGISTRY);

  // Sample agents to register
  // metadataUri is a JSON string with name, description, endpoint
  const agents = [
    {
      metadataUri: JSON.stringify({
        name: 'DeFi Price Oracle',
        description: 'Get real-time token prices from multiple DEXs on Cronos',
        endpoint: 'https://api.nexus402.io/agents/price-oracle',
        version: '1.0.0',
      }),
      capabilities: ['defi', 'data-oracle', 'trading'],
      pricePerCall: ethers.parseUnits('0.10', 6), // 0.10 USDC
    },
    {
      metadataUri: JSON.stringify({
        name: 'Sentiment Analyzer',
        description: 'Analyze social media sentiment for any token using AI',
        endpoint: 'https://api.nexus402.io/agents/sentiment',
        version: '1.0.0',
      }),
      capabilities: ['analytics', 'trading'],
      pricePerCall: ethers.parseUnits('0.25', 6), // 0.25 USDC
    },
    {
      metadataUri: JSON.stringify({
        name: 'Yield Optimizer',
        description: 'Find the best yield farming opportunities across Cronos DeFi',
        endpoint: 'https://api.nexus402.io/agents/yield-optimizer',
        version: '1.0.0',
      }),
      capabilities: ['defi', 'automation'],
      pricePerCall: ethers.parseUnits('0.50', 6), // 0.50 USDC
    },
    {
      metadataUri: JSON.stringify({
        name: 'Smart Contract Auditor',
        description: 'AI-powered security analysis for smart contracts',
        endpoint: 'https://api.nexus402.io/agents/auditor',
        version: '1.0.0',
      }),
      capabilities: ['security', 'automation'],
      pricePerCall: ethers.parseUnits('1.00', 6), // 1.00 USDC
    },
  ];

  console.log('\n--- Registering Agents ---');
  
  for (const agent of agents) {
    try {
      const metadata = JSON.parse(agent.metadataUri);
      console.log(`\nRegistering: ${metadata.name}...`);
      const tx = await registry.registerAgent(
        agent.metadataUri,
        agent.capabilities,
        agent.pricePerCall,
        deployer.address // paymentAddress
      );
      const receipt = await tx.wait();
      console.log(`  ✓ Registered! TX: ${tx.hash}`);
      
      // Try to get agent ID from events
      for (const log of receipt.logs) {
        try {
          const parsed = registry.interface.parseLog(log);
          if (parsed?.name === 'AgentRegistered') {
            console.log(`  Agent ID: ${parsed.args.agentId}`);
          }
        } catch {}
      }
    } catch (error: any) {
      console.log(`  ✗ Failed: ${error.message?.slice(0, 100)}`);
    }
  }

  // Get stats
  try {
    const stats = await registry.getStats();
    console.log(`\n✓ Total agents registered: ${stats.totalAgents}`);
    console.log(`✓ Total calls: ${stats.totalCalls}`);
  } catch (e) {
    console.log('Could not get stats');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
