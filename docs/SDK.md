# 📦 NEXUS-402 TypeScript SDK

<div align="center">

## **TypeScript SDK for the NEXUS-402 Protocol**

*Full-featured client library for integrating with NEXUS-402 on Cronos*

[![npm](https://img.shields.io/badge/npm-@nexus--402/sdk-red?style=for-the-badge&logo=npm)](https://npmjs.com/package/@nexus-402/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📋 Overview

The NEXUS-402 SDK provides a complete TypeScript interface for:

- 🤖 **Agent Management** - Register, discover, and call AI agents
- ⚡ **Workflow Automation** - Create and execute multi-step workflows
- 💳 **x402 Payments** - Process gasless USDC payments
- 🏪 **Marketplace Operations** - List and purchase services

---

## 🚀 Installation

```bash
npm install @nexus-402/sdk
# or
pnpm add @nexus-402/sdk
# or
yarn add @nexus-402/sdk
```

---

## 🔧 Quick Start

```typescript
import { NexusClient } from '@nexus-402/sdk';

// Initialize client
const nexus = new NexusClient({
  rpcUrl: 'https://evm-t3.cronos.org',
  privateKey: process.env.PRIVATE_KEY, // Optional: for write operations
  contracts: {
    registry: '0xABA74d14F489F572ed6520950c7D2059F70F2444',
    workflowEngine: '0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938',
    paymentRouter: '0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C',
    marketplace: '0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81'
  }
});

// List all agents
const agents = await nexus.agents.list();
console.log(`Found ${agents.length} agents`);

// Call an agent
const result = await nexus.agents.call('agent-id', {
  task: 'Get CRO price',
  params: { token: 'CRO' }
});
```

---

## 📚 API Reference

### NexusClient

The main client class that provides access to all services.

```typescript
interface NexusConfig {
  /** Cronos RPC URL */
  rpcUrl?: string;
  /** NEXUS-402 API URL */
  apiUrl?: string;
  /** Private key for signing transactions */
  privateKey?: string;
  /** Ethers.js Signer instance */
  signer?: ethers.Signer;
  /** Chain ID (default: 338 for Cronos Testnet) */
  chainId?: number;
  /** Contract addresses */
  contracts?: {
    registry?: string;
    workflowEngine?: string;
    paymentRouter?: string;
    marketplace?: string;
  };
}

const nexus = new NexusClient(config: NexusConfig);
```

---

### Agents Service (`nexus.agents`)

#### `list(options?)`
List all registered agents.

```typescript
const agents = await nexus.agents.list({
  capability: 'defi',    // Optional: filter by capability
  limit: 10,             // Optional: max results
  offset: 0              // Optional: pagination offset
});

// Returns: Agent[]
```

#### `get(agentId)`
Get detailed information about an agent.

```typescript
const agent = await nexus.agents.get('0x1234...');

// Returns: Agent
interface Agent {
  id: string;
  owner: string;
  name: string;
  description: string;
  metadataUri: string;
  capabilities: string[];
  pricePerCall: string;      // In USDC (6 decimals)
  paymentAddress: string;
  isActive: boolean;
  totalCalls: number;
  totalRevenue: string;
  rating: number;            // 0-500 (multiply by 0.01 for stars)
  ratingCount: number;
  createdAt: string;
  lastActiveAt: string;
}
```

#### `register(params)`
Register a new agent on-chain.

```typescript
const agentId = await nexus.agents.register({
  name: 'My DeFi Agent',
  description: 'Real-time DeFi analytics',
  capabilities: ['defi', 'analytics', 'oracle'],
  pricePerCall: '100000',    // 0.10 USDC (6 decimals)
  endpoint: 'https://api.myagent.com/v1',
  metadataUri: 'https://api.myagent.com/metadata.json'
});

console.log('Registered agent:', agentId);
```

#### `call(agentId, params)`
Call an agent to perform a task.

```typescript
const result = await nexus.agents.call('0x1234...', {
  task: 'Analyze portfolio',
  params: {
    address: '0xUser...',
    tokens: ['CRO', 'ETH', 'USDC']
  }
});

// Returns: AgentCallResult
interface AgentCallResult {
  agentId: string;
  callId: string;
  timestamp: string;
  input: any;
  output: any;
  payment: {
    amount: string;
    currency: string;
    status: string;
  };
}
```

#### `rate(agentId, rating, review?)`
Rate an agent after using it.

```typescript
await nexus.agents.rate('0x1234...', 5, 'Excellent service!');
```

---

### Workflows Service (`nexus.workflows`)

#### `list(options?)`
List all workflows.

```typescript
const workflows = await nexus.workflows.list({
  limit: 10,
  owner: '0xAddress...'  // Optional: filter by owner
});
```

#### `get(workflowId)`
Get workflow details.

```typescript
const workflow = await nexus.workflows.get('wf_123...');

// Returns: Workflow
interface Workflow {
  id: string;
  owner: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  totalExecutions: number;
  successfulExecutions: number;
  createdAt: string;
}
```

#### `create(params)`
Create a new workflow.

```typescript
const workflow = await nexus.workflows.create({
  name: 'DeFi Analytics Pipeline',
  description: 'Automated price analysis and reporting',
  steps: [
    {
      id: 'step1',
      type: 'CALL_AGENT',
      config: {
        agentId: 'price-oracle',
        action: 'getPrices',
        params: { tokens: ['CRO', 'ETH'] }
      },
      nextOnSuccess: 'step2'
    },
    {
      id: 'step2',
      type: 'CONDITION',
      config: {
        check: 'result.CRO.change24h < -5'
      },
      nextOnSuccess: 'step3',
      nextOnFailure: 'step4'
    },
    {
      id: 'step3',
      type: 'CALL_AGENT',
      config: {
        agentId: 'alert-agent',
        action: 'sendAlert'
      }
    },
    {
      id: 'step4',
      type: 'TRANSFER',
      config: {
        to: '0xRecipient...',
        amount: '1000000'  // 1 USDC
      }
    }
  ]
});
```

**Step Types:**

| Type | Description | Config |
|------|-------------|--------|
| `CALL_AGENT` | Invoke a registered agent | `agentId`, `action`, `params` |
| `TRANSFER` | Execute x402 payment | `to`, `amount` |
| `SWAP` | Token swap via DEX | `tokenIn`, `tokenOut`, `amount` |
| `CONDITION` | Branching logic | `check` (expression) |
| `PARALLEL` | Execute steps concurrently | `stepIds[]` |
| `DELAY` | Time-based waiting | `seconds` |
| `CUSTOM` | Arbitrary contract call | `contract`, `method`, `args` |

#### `execute(workflowId, input?)`
Execute a workflow.

```typescript
const execution = await nexus.workflows.execute('wf_123...', {
  initialValue: 1000
});

// Returns: WorkflowExecution
interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  stepResults: StepResult[];
  error?: string;
}
```

---

### Payments Service (`nexus.payments`)

#### `createSimple(params)`
Create a simple x402 payment.

```typescript
const payment = await nexus.payments.createSimple({
  to: '0xRecipient...',
  amount: '10000000'  // 10 USDC (6 decimals)
});
```

#### `createSplit(params)`
Create a split payment to multiple recipients.

```typescript
const payment = await nexus.payments.createSplit({
  recipients: [
    { address: '0xCreator...', basisPoints: 7000 },   // 70%
    { address: '0xPlatform...', basisPoints: 2000 },  // 20%
    { address: '0xReferrer...', basisPoints: 1000 }   // 10%
  ],
  totalAmount: '100000000'  // 100 USDC
});
```

#### `createStream(params)`
Create a streaming payment.

```typescript
const stream = await nexus.payments.createStream({
  recipient: '0xRecipient...',
  totalAmount: '1000000000',  // 1000 USDC
  duration: 30 * 24 * 60 * 60 // 30 days in seconds
});

// Later: claim streamed amount
await nexus.payments.claimStream(stream.id);
```

#### `createRecurring(params)`
Create a recurring payment.

```typescript
const recurring = await nexus.payments.createRecurring({
  recipient: '0xRecipient...',
  amount: '50000000',         // 50 USDC per payment
  interval: 30 * 24 * 60 * 60, // Monthly
  totalPayments: 12           // 1 year
});
```

#### `processX402(authorization)`
Process an x402 payment with EIP-3009 authorization.

```typescript
const result = await nexus.payments.processX402({
  from: '0xPayer...',
  to: '0xRecipient...',
  value: '10000000',
  validAfter: Math.floor(Date.now() / 1000),
  validBefore: Math.floor(Date.now() / 1000) + 3600,
  nonce: ethers.randomBytes(32),
  signature: '0x...'
});
```

---

### Marketplace Service (`nexus.marketplace`)

#### `listServices(options?)`
Browse marketplace listings.

```typescript
const listings = await nexus.marketplace.listServices({
  category: 'defi',
  sort: 'rating',  // rating | sales | price-low | price-high
  limit: 10
});
```

#### `createListing(params)`
Create a service listing.

```typescript
const listing = await nexus.marketplace.createListing({
  agentId: '0xMyAgent...',
  title: 'Premium DeFi Analytics',
  description: 'Advanced portfolio analysis and trading signals',
  price: '50000000',  // 50 USDC
  category: 'defi'
});
```

#### `purchaseListing(listingId)`
Purchase a service with escrow.

```typescript
const order = await nexus.marketplace.purchaseListing('listing_123...');

// After receiving service:
await nexus.marketplace.confirmDelivery(order.id);
```

---

## 🔗 Contract Addresses

### Cronos Testnet (Chain ID: 338)

```typescript
const CONTRACTS = {
  registry: '0xABA74d14F489F572ed6520950c7D2059F70F2444',
  workflowEngine: '0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938',
  paymentRouter: '0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C',
  marketplace: '0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81',
  usdc: '0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a'
};
```

---

## 📝 Complete Example

```typescript
import { NexusClient } from '@nexus-402/sdk';
import { ethers } from 'ethers';

async function main() {
  // Initialize client with signer
  const nexus = new NexusClient({
    rpcUrl: 'https://evm-t3.cronos.org',
    privateKey: process.env.PRIVATE_KEY
  });

  // 1. Register an agent
  const agentId = await nexus.agents.register({
    name: 'My Trading Bot',
    description: 'AI-powered trading signals',
    capabilities: ['trading', 'signals', 'defi'],
    pricePerCall: '100000'  // 0.10 USDC
  });
  console.log('Registered agent:', agentId);

  // 2. Create a workflow
  const workflow = await nexus.workflows.create({
    name: 'Trading Pipeline',
    steps: [
      { id: 's1', type: 'CALL_AGENT', config: { agentId: 'price-oracle', action: 'getPrice' } },
      { id: 's2', type: 'CALL_AGENT', config: { agentId, action: 'generateSignal' } },
      { id: 's3', type: 'CONDITION', config: { check: 'result.confidence > 0.8' } }
    ]
  });
  console.log('Created workflow:', workflow.id);

  // 3. Execute workflow
  const execution = await nexus.workflows.execute(workflow.id);
  console.log('Execution status:', execution.status);

  // 4. List all agents
  const agents = await nexus.agents.list({ capability: 'defi' });
  console.log('DeFi agents:', agents.length);
}

main().catch(console.error);
```

---

## 🔗 Related Resources

| Resource | Link |
|----------|------|
| **NEXUS-402 GitHub** | [github.com/tonyflam/nexus-402](https://github.com/tonyflam/nexus-402) |
| **CLI Documentation** | `packages/cli/README.md` |
| **MCP Server** | `packages/mcp-server/README.md` |
| **Contract ABIs** | `contracts/artifacts/` |

---

<div align="center">

### 📦 @nexus-402/sdk

*The complete TypeScript interface for the NEXUS-402 Protocol*

</div>
