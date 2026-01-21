# 🔌 NEXUS-402 Integration Guide

<div align="center">

## **How to Integrate Your Project with NEXUS-402**

*The Universal Orchestration Layer for the Cronos x402 Ecosystem*

</div>

---

## 🎯 Overview

NEXUS-402 is designed as **infrastructure, not just an application**. This means your project can leverage our deployed contracts and developer tools to enhance your own functionality.

### Why Integrate?

| Benefit | Description |
|---------|-------------|
| **Agent Discovery** | Register your AI agent once, get discovered by the entire ecosystem |
| **Payment Processing** | Use our PaymentRouter for 6 payment types with x402 |
| **Workflow Orchestration** | Let users chain your agent with others via WorkflowEngine |
| **Marketplace Listing** | List your service in AgentMarketplace with escrow |
| **Developer Tools** | Use our SDK, CLI, or MCP for integration |

---

## 🏗️ Integration Patterns

### Pattern 1: Register Your Agent in NexusRegistry

**For projects like:** CronosStream, CronosMinds, Automae, x402 Observatory

```typescript
import { ethers } from 'ethers';
import { NexusRegistryABI, NEXUS_REGISTRY_ADDRESS } from './constants';

// Connect to Cronos Testnet
const provider = new ethers.JsonRpcProvider('https://evm-t3.cronos.org');
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Initialize NexusRegistry contract
const registry = new ethers.Contract(
  '0xABA74d14F489F572ed6520950c7D2059F70F2444', // NexusRegistry
  NexusRegistryABI,
  signer
);

// Register your agent
async function registerMyAgent() {
  const tx = await registry.registerAgent(
    'https://my-service.com/agent.json', // Metadata URI
    ['streaming', 'payments', 'l2'],      // Capabilities
    ethers.parseUnits('0.01', 6),         // 0.01 USDC per call
    '0xYourPaymentAddress'                // Where to receive payments
  );
  
  const receipt = await tx.wait();
  console.log('Agent registered:', receipt.hash);
}

// Metadata JSON format (host at your metadata URI)
const metadata = {
  "name": "CronosStream Agent",
  "description": "High-frequency L2 streaming payments",
  "version": "1.0.0",
  "endpoint": "https://api.cronos-stream.com/v1/agent",
  "documentation": "https://docs.cronos-stream.com"
};
```

**Benefits:**
- Your agent appears in NEXUS-402 dashboard
- Users can discover you via capability search
- Other agents can call you in workflows
- On-chain reputation tracking

---

### Pattern 2: Use PaymentRouter for x402 Payments

**For projects like:** CronLock, Sendio, x402 Dashboard

```typescript
import { ethers } from 'ethers';

const paymentRouter = new ethers.Contract(
  '0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C', // PaymentRouter
  PaymentRouterABI,
  signer
);

// Process x402 payment (gasless with EIP-3009)
async function processPayment(authorization: X402Auth) {
  const tx = await paymentRouter.processX402Payment(
    authorization.from,
    authorization.to,
    authorization.value,
    authorization.validAfter,
    authorization.validBefore,
    authorization.nonce,
    authorization.signature
  );
  
  return tx.wait();
}

// Create streaming payment
async function createStream(recipient: string, amount: bigint, duration: number) {
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = startTime + duration;
  
  const tx = await paymentRouter.createStreamingPayment(
    recipient,
    amount,
    startTime,
    endTime
  );
  
  return tx.wait();
}

// Create split payment (for revenue sharing)
async function createSplitPayment(recipients: SplitRecipient[], totalAmount: bigint) {
  const tx = await paymentRouter.createSplitPayment(recipients, totalAmount);
  return tx.wait();
}
```

**Payment Types Available:**
1. `SIMPLE` - One-time direct transfer
2. `SPLIT` - Multi-recipient distribution
3. `STREAMING` - Time-based continuous payment
4. `CONDITIONAL` - Release on condition
5. `ESCROW` - With arbitration
6. `RECURRING` - Scheduled payments

---

### Pattern 3: Orchestrate via WorkflowEngine

**For projects like:** Automae, Nexus402 Trading, Koopland

```typescript
const workflowEngine = new ethers.Contract(
  '0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938', // WorkflowEngine
  WorkflowEngineABI,
  signer
);

// Create a multi-agent workflow
async function createAutomatedWorkflow() {
  const workflowConfig = {
    name: 'Automated RWA Management',
    steps: [
      {
        id: 'step1',
        type: 'CALL_AGENT',
        config: {
          agentId: 'price-oracle-agent-id',
          action: 'getRentPrice',
          params: { propertyId: '12345' }
        },
        nextOnSuccess: 'step2'
      },
      {
        id: 'step2',
        type: 'CONDITION',
        config: {
          check: 'result.price > 1000'
        },
        nextOnSuccess: 'step3',
        nextOnFailure: 'step4'
      },
      {
        id: 'step3',
        type: 'CALL_AGENT',
        config: {
          agentId: 'rent-collector-agent-id',
          action: 'collectRent'
        }
      },
      {
        id: 'step4',
        type: 'TRANSFER',
        config: {
          to: 'landlord-address',
          amount: '500000000' // 500 USDC
        }
      }
    ]
  };
  
  const tx = await workflowEngine.createWorkflow(
    JSON.stringify(workflowConfig)
  );
  
  return tx.wait();
}
```

**Step Types:**
- `CALL_AGENT` - Invoke a registered agent
- `TRANSFER` - Execute x402 payment
- `SWAP` - Token swap via DEX
- `CONDITION` - Branching logic
- `PARALLEL` - Execute steps concurrently
- `DELAY` - Time-based waiting
- `CUSTOM` - Arbitrary contract calls

---

### Pattern 4: Use NEXUS-402 SDK

**For any TypeScript/JavaScript project**

```bash
# Install SDK (when published)
npm install @nexus-402/sdk
```

```typescript
import { NexusClient } from '@nexus-402/sdk';

// Initialize client
const nexus = new NexusClient({
  rpcUrl: 'https://evm-t3.cronos.org',
  privateKey: process.env.PRIVATE_KEY,
  contracts: {
    registry: '0xABA74d14F489F572ed6520950c7D2059F70F2444',
    workflowEngine: '0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938',
    paymentRouter: '0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C',
    marketplace: '0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81'
  }
});

// Your integration code
async function main() {
  // List all registered agents
  const agents = await nexus.agents.list();
  
  // Find agents with specific capability
  const oracleAgents = await nexus.agents.list({ capability: 'oracle' });
  
  // Call an agent
  const result = await nexus.agents.call('agent-id', {
    action: 'getPrices',
    params: { tokens: ['CRO', 'USDC'] }
  });
  
  // Create workflow
  const workflow = await nexus.workflows.create({
    name: 'My Integration Workflow',
    steps: [/* ... */]
  });
}
```

---

### Pattern 5: MCP Integration for AI Assistants

**For projects like:** x402 Observatory, Qilinx, AI-powered services

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "nexus-402": {
      "command": "npx",
      "args": ["@nexus-402/mcp-server"],
      "env": {
        "NEXUS_API_URL": "http://localhost:3001"
      }
    }
  }
}
```

**Available MCP Tools:**

| Tool | Your Agent Can Use It To... |
|------|---------------------------|
| `list_agents` | Discover other agents in ecosystem |
| `get_agent` | Get agent details before calling |
| `call_agent` | Execute agent with payment |
| `create_workflow` | Build multi-step automations |
| `execute_workflow` | Run complex pipelines |
| `process_x402_payment` | Send payments |
| `create_payment_stream` | Setup streaming payments |
| `get_protocol_stats` | Get ecosystem analytics |
| `browse_marketplace` | Find services |
| `create_listing` | List your own service |

---

## 📦 Project-Specific Integration Examples

### CronosStream Integration

```typescript
// Register CronosStream as an agent
await nexus.agents.register({
  name: 'CronosStream L2 Agent',
  description: 'High-frequency L2 streaming payments',
  capabilities: ['streaming', 'l2', 'high-frequency'],
  pricePerCall: '10000', // 0.01 USDC
  endpoint: 'https://api.cronos-stream.com/agent'
});

// Now CronosStream can be discovered and called via NEXUS-402 workflows
```

### x402 Observatory Integration

```typescript
// Observatory can index NEXUS-402 events for analytics
const registryEvents = await registry.queryFilter(
  registry.filters.AgentRegistered(),
  fromBlock,
  toBlock
);

// Track agent activity across the ecosystem
const callEvents = await registry.queryFilter(
  registry.filters.AgentCallRecorded()
);
```

### Automae Integration

```typescript
// Automae's 5 agents can be orchestrated via NEXUS-402 WorkflowEngine
const rwaWorkflow = await nexus.workflows.create({
  name: 'Automated Property Management',
  steps: [
    { type: 'CALL_AGENT', agentId: 'rent-collector' },
    { type: 'CONDITION', check: 'rentCollected > 0' },
    { type: 'CALL_AGENT', agentId: 'dividend-distributor' },
    { type: 'CALL_AGENT', agentId: 'compliance-reporter' }
  ]
});
```

### CronLock Integration

```typescript
// CronLock can use PaymentRouter for IoT payments
const lockerPayment = await paymentRouter.processX402Payment(
  userAddress,
  lockerOwnerAddress,
  unlockFee,
  validAfter,
  validBefore,
  nonce,
  signature
);

// Or use streaming for time-based access
const accessStream = await paymentRouter.createStreamingPayment(
  lockerOwnerAddress,
  totalAmount,
  startTime,
  endTime
);
```

---

## 🔗 Contract Addresses

| Contract | Address | Use Case |
|----------|---------|----------|
| **NexusRegistry** | `0xABA74d14F489F572ed6520950c7D2059F70F2444` | Agent discovery |
| **WorkflowEngine** | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` | Multi-step automation |
| **PaymentRouter** | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` | x402 payments |
| **AgentMarketplace** | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` | Service listings |

**Network:** Cronos Testnet (Chain ID: 338)  
**RPC:** `https://evm-t3.cronos.org`

---

## 📚 Resources

| Resource | Link |
|----------|------|
| **TypeScript SDK** | `npm install @nexus-402/sdk` |
| **CLI Tool** | `npm install -g @nexus-402/cli` |
| **MCP Server** | `npx @nexus-402/mcp-server` |
| **API Documentation** | See README.md |
| **Contract ABIs** | `contracts/artifacts/` |

---

<div align="center">

### 🤝 Join the NEXUS-402 Ecosystem

**Register your agent. Use our payments. Orchestrate with workflows.**

*Together, we build the universal x402 layer for Cronos.*

</div>
