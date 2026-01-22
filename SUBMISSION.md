# NEXUS-402: The Universal x402 Orchestration Protocol for Cronos

[![Demo Video](https://img.youtube.com/vi/K8bI92NpbHc/maxresdefault.jpg)](https://youtu.be/K8bI92NpbHc)

> **"Other hackathon projects are applications. NEXUS-402 is the platform they can build ON."**

---

## What We Built

NEXUS-402 is the **infrastructure layer** that enables the entire Cronos AI agent ecosystem. We deployed **4 smart contracts** and registered **4 AI agents on-chain** - all verifiable on the Cronos Testnet explorer.

### Live Deployed Contracts

| Contract | Address | Purpose |
|----------|---------|---------|
| **NexusRegistry** | `0xABA74d14F489F572ed6520950c7D2059F70F2444` | Agent Discovery & Registration |
| **WorkflowEngine** | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` | Multi-Step Orchestration |
| **PaymentRouter** | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` | x402 Payment Processing |
| **AgentMarketplace** | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` | Service Listing & Escrow |

[**→ Verify on Cronos Explorer**](https://explorer.cronos.org/testnet/address/0xABA74d14F489F572ed6520950c7D2059F70F2444)

---

## The Problem We Solve

The x402 ecosystem on Cronos is **fragmented**:

**No Unified Discovery** - AI agents have no standard way to be found  
**Reinventing Payments** - Every project builds their own payment logic  
**No Orchestration** - No way to chain multiple agents into workflows  
**Poor Developer Experience** - Lack of SDKs and tooling  

---

## Our Solution

### 1. Universal Agent Registry
Any AI agent can register on-chain and be discovered by the entire ecosystem.

```solidity
function registerAgent(
    string memory metadataUri,
    string[] memory capabilities,
    uint256 pricePerCall,
    address paymentAddress
) external returns (bytes32 agentId);
```

**4 Agents Already Registered:**

| Agent | Price per Call |
|-------|----------------|
| DeFi Price Oracle | $0.05 USDC |
| Sentiment Analyzer | $0.10 USDC |
| Yield Optimizer | $0.15 USDC |
| Smart Contract Auditor | $0.25 USDC |

### 2. Six Payment Types

Not just simple payments - we support the full spectrum:

| Payment Type | Use Case | Description |
|--------------|----------|-------------|
| **Simple** | One-time agent calls | Direct payment for single execution |
| **Split** | Multi-recipient payments | Distribute funds across multiple agents |
| **Streaming** | Subscription services | Time-based continuous payment flow |
| **Escrow** | Milestone-based work | Locked funds released on completion |
| **Recurring** | Automated billing | Scheduled periodic payments |
| **Conditional** | Oracle-triggered payments | Event-based payment execution |

### 3. Workflow Engine
Chain multiple agents into automated pipelines:

```
Price Oracle → Sentiment Analyzer → Trading Decision → Payment Execution
```

### 4. Complete Developer Toolkit

| Package | Type | Purpose |
|---------|------|---------||
| **@nexus-402/sdk** | TypeScript SDK | Programmatic access to all protocol functions |
| **@nexus-402/cli** | Command-line tool | Terminal-based agent and workflow management |
| **@nexus-402/mcp-server** | MCP Server | AI assistant integration for Claude and ChatGPT |

---

## Why NEXUS-402 Wins

| Metric | NEXUS-402 | Typical Competitor Project |
|--------|-----------|----------------------------|
| Smart Contracts Deployed | 4 | 0-1 |
| Registered On-Chain Agents | 4 | 0 |
| Payment Types Supported | 6 | 1-2 |
| Developer Tools | SDK + CLI + MCP | None |
| Crypto.com Integration | Market Data + AI Agent SDK | None |

---

## Crypto.com Ecosystem Integration

| Integration | Description |
|-------------|-------------|
| **Market Data API** | Real-time CRO prices from Crypto.com Exchange |
| **AI Agent SDK Pattern** | Following Crypto.com's AI Agent SDK design |
| **Native Cronos** | Deep integration with Cronos EVM testnet |

---

## Links

| Resource | URL |
|----------|-----|
| **GitHub Repository** | https://github.com/tonyflam/nexus-402 |
| **Demo Video** | https://youtu.be/K8bI92NpbHc |
| **Contract Explorer** | https://explorer.cronos.org/testnet/address/0xABA74d14F489F572ed6520950c7D2059F70F2444 |

---

## Tracks Addressed

| Track | Key Features |
|-------|-------------|
| **Main Track - x402 Applications** | Complete x402 application with 4 deployed contracts |
| **Best Agentic Finance** | Multi-agent workflows with payment orchestration |
| **Best Ecosystem Integration** | Deep Cronos + Crypto.com integration |
| **Best Developer Tooling** | SDK, CLI, and MCP Server |  

---

*Built with ❤️ for the Cronos x402 Paytech Hackathon*
