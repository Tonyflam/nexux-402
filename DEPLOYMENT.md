# NEXUS-402 Deployment Documentation

## Deployed Contracts on Cronos Testnet

All contracts are deployed and operational on **Cronos Testnet (Chain ID: 338)**.

### Contract Addresses

| Contract | Address | Purpose |
|----------|---------|---------|
| **NexusRegistry** | `0xABA74d14F489F572ed6520950c7D2059F70F2444` | AI Agent Registry & Discovery |
| **WorkflowEngine** | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` | Multi-step Workflow Execution |
| **PaymentRouter** | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` | x402 Payment Processing |
| **AgentMarketplace** | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` | Agent Marketplace |

### Verify on Explorer

- [NexusRegistry](https://explorer.cronos.org/testnet/address/0xABA74d14F489F572ed6520950c7D2059F70F2444)
- [WorkflowEngine](https://explorer.cronos.org/testnet/address/0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938)
- [PaymentRouter](https://explorer.cronos.org/testnet/address/0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C)
- [AgentMarketplace](https://explorer.cronos.org/testnet/address/0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81)

---

## Token Addresses

| Token | Address |
|-------|---------|
| **USDC.e** | `0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a` |

---

## Registered Agents

### Agent 1: DeFi Price Oracle
- **Transaction:** [0x173a080b1f40e0636c0fc748f8987c80bcd3c93b8beeb02188d8b070dc380c1d](https://explorer.cronos.org/testnet/tx/0x173a080b1f40e0636c0fc748f8987c80bcd3c93b8beeb02188d8b070dc380c1d)
- **Capabilities:** `defi`, `pricing`, `oracle`
- **Price:** 0.05 USDC per call

### Agent 2: Sentiment Analyzer
- **Transaction:** [0x3aa75a5eca97317dd6f42595e585fed89cbcf9ba0bcd5e98f5281fb8bfc69fc4](https://explorer.cronos.org/testnet/tx/0x3aa75a5eca97317dd6f42595e585fed89cbcf9ba0bcd5e98f5281fb8bfc69fc4)
- **Capabilities:** `analytics`, `sentiment`, `ai`
- **Price:** 0.10 USDC per call

---

## Deployment Steps

### 1. Install Dependencies

```bash
cd contracts
pnpm install
```

### 2. Configure Environment

Create a `.env` file with your private key:

```env
PRIVATE_KEY=your_private_key_here
```

### 3. Deploy Contracts

```bash
npx hardhat run scripts/deploy.ts --network cronos-testnet
```

### 4. Register Sample Agents

```bash
npx hardhat run scripts/register-agents.ts --network cronos-testnet
```

---

## Network Information

| Property | Value |
|----------|-------|
| **Network Name** | Cronos Testnet |
| **Chain ID** | 338 |
| **RPC URL** | https://evm-t3.cronos.org |
| **Explorer** | https://explorer.cronos.org/testnet |
| **Faucet** | https://cronos.org/faucet |
| **Currency** | TCRO (Test CRO) |

---

## Frontend Integration

The frontend reads directly from deployed contracts using:

```typescript
// apps/frontend/src/lib/contracts.ts
export const CONTRACTS = {
  NEXUS_REGISTRY: '0xABA74d14F489F572ed6520950c7D2059F70F2444',
  WORKFLOW_ENGINE: '0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938',
  PAYMENT_ROUTER: '0x34096A7221a2EFE7996C1223fc9d81ACd188Ca3C',
  AGENT_MARKETPLACE: '0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81',
  USDC: '0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a',
};
```

---

## Verification Status

All contracts were deployed successfully but are not yet verified on the explorer. To verify:

```bash
npx hardhat verify --network cronos-testnet <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

---

*Last Updated: Deployed for Cronos x402 Paytech Hackathon*
