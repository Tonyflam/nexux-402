# 🏆 NEXUS-402 - Cronos x402 Paytech Hackathon Submission

<div align="center">

## **The Universal x402 Orchestration Protocol for Cronos**

### 🎯 Targeting ALL 4 Tracks | $35,000 Total Prize Pool

[![Live](https://img.shields.io/badge/Status-LIVE%20on%20Testnet-00FF00?style=for-the-badge)](https://explorer.cronos.org/testnet)
[![Contracts](https://img.shields.io/badge/Contracts-4%20Deployed-purple?style=for-the-badge)](https://explorer.cronos.org/testnet)

</div>

---

## 📋 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Why NEXUS-402 Wins](#-why-nexus-402-wins)
3. [Competitive Advantage](#-competitive-advantage)
4. [Track Alignment](#-track-alignment)
5. [Technical Implementation](#-technical-implementation)
6. [Live Deployment](#-live-deployment)
7. [Demo Guide](#-demo-guide)
8. [Judging Criteria Checklist](#-judging-criteria-checklist)

---

## 🚀 Executive Summary

**NEXUS-402** is not just another hackathon application—it's the **infrastructure layer** that enables the entire Cronos AI agent ecosystem.

### The Problem

The x402 ecosystem on Cronos is fragmented:
- No unified way to discover AI agents
- Each project reinvents payment processing
- No orchestration layer for multi-agent workflows
- Developers lack proper tooling (SDK, CLI, MCP)

### The Solution

NEXUS-402 provides:
1. **NexusRegistry** - Universal agent discovery & registration
2. **WorkflowEngine** - Multi-step agent orchestration
3. **PaymentRouter** - 6 payment types with x402 support
4. **AgentMarketplace** - Service listing with escrow

### Key Differentiator

> **"Other hackathon projects are applications. NEXUS-402 is the platform they can build on."**

---

## ⚡ Why NEXUS-402 Wins

### 📊 Quantitative Advantages

| Metric | NEXUS-402 | CronosStream | x402 Observatory | Qilinx | Typical Project |
|--------|-----------|--------------|------------------|--------|-----------------|
| **Smart Contracts Deployed** | **4** | 1 | 0 | 1 | 0-1 |
| **Registered On-Chain Agents** | **4** | 0 | 0 | 0 | 0 |
| **Payment Types** | **6** | 2 | 0 | 3 | 1-2 |
| **Developer Tools** | **SDK+CLI+MCP** | None | MCP only | SDK only | None |
| **On-Chain Agent Registry** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Workflow Engine** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **TypeScript SDK** | ✅ Full | ❌ | ❌ | ✅ Basic | ❌ |
| **MCP Server Tools** | **10+** | 0 | 3 | 0 | 0 |
| **Crypto.com Integration** | ✅ Market + AI | ❌ | ❌ | ❌ | ❌ |
| **Tracks Addressed** | **4/4** | 2/4 | 2/4 | 2/4 | 1-2/4 |

### 🏗️ Qualitative Advantages

1. **Infrastructure vs Application**
   - CronosStream: Single-purpose L2 payments
   - x402 Observatory: Analytics only
   - Qilinx: Contract builder only
   - **NEXUS-402: Universal orchestration layer ALL can use**

2. **Crypto.com Ecosystem Integration**
   - **Market Data API** for real-time prices and sentiment
   - **AI Agent SDK pattern** for intelligent agent actions
   - Native CRO support with live market data

3. **Ecosystem Unification**
   - Other agents can register in our registry
   - Other projects can use our payment router
   - AI assistants can orchestrate via our MCP

3. **Complete Developer Story**
   - SDK for programmatic access
   - CLI for command-line workflows
   - MCP for AI assistant integration
   - REST API for HTTP clients

---

## 🏁 Competitive Advantage

### How Other Projects Can Integrate With Us

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        NEXUS-402 AS UNIVERSAL LAYER                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐          │
│   │  CronosStream   │     │ x402 Observatory│     │    Qilinx       │          │
│   │  L2 Streaming   │     │   Analytics     │     │  Contract Dev   │          │
│   └────────┬────────┘     └────────┬────────┘     └────────┬────────┘          │
│            │                       │                       │                    │
│            │  Register Agent       │  Index Events         │  Deploy to         │
│            │  in NexusRegistry     │  from Registry        │  PaymentRouter     │
│            │                       │                       │                    │
│            ▼                       ▼                       ▼                    │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                         NEXUS-402 PROTOCOL                               │  │
│   │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │  │
│   │  │ Registry    │ │ Workflow    │ │ Payment     │ │ Marketplace │        │  │
│   │  │ 0xABA7...   │ │ 0xd055...   │ │ 0x3409...   │ │ 0xBf13...   │        │  │
│   │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│            ▲                       ▲                       ▲                    │
│            │                       │                       │                    │
│            │  Register Agent       │  Orchestrate via      │  List Services     │
│            │                       │  WorkflowEngine       │  in Marketplace    │
│            │                       │                       │                    │
│   ┌────────┴────────┐     ┌────────┴────────┐     ┌────────┴────────┐          │
│   │    Automae      │     │  CronosMinds    │     │   CronLock      │          │
│   │  RWA Lifecycle  │     │  Pay-per-Prompt │     │  IoT Payments   │          │
│   └─────────────────┘     └─────────────────┘     └─────────────────┘          │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Feature Comparison Matrix

| Feature | NEXUS-402 | CronosStream | x402 Observatory | Qilinx | Automae | CronosMinds |
|---------|-----------|--------------|------------------|--------|---------|-------------|
| Agent Registry | ✅ On-chain | ❌ | ❌ | ❌ | ❌ | ❌ |
| Workflow Engine | ✅ Multi-step | ❌ | ❌ | ❌ | ❌ | ❌ |
| x402 Payments | ✅ 6 types | ✅ 2 types | ❌ | ✅ 3 hooks | ❌ | ✅ Native |
| Marketplace | ✅ With Escrow | ❌ | ❌ | ❌ | ❌ | ❌ |
| TypeScript SDK | ✅ Full | ❌ | ❌ | ✅ Basic | ❌ | ❌ |
| CLI Tool | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| MCP Server | ✅ 10+ tools | ❌ | ✅ 3 tools | ❌ | ❌ | ❌ |
| Live Frontend | ✅ Next.js 14 | ❌ Docker | ✅ Vercel | ✅ | ✅ | ✅ |
| Performance Metrics | ~2s finality | ~150ms L2 | N/A | N/A | N/A | N/A |

---

## 🎯 Track Alignment

### 🥇 Track 1: Main Track ($24,000)
**"x402 Applications - Broad Use Cases"**

| Requirement | NEXUS-402 Implementation | Status |
|-------------|-------------------------|--------|
| Novel x402 application | Universal agent orchestration with x402 | ✅ |
| Embedded x402 flows | Payment in agent calls, workflows, marketplace | ✅ |
| Consumer-facing UI | Next.js 14 dashboard with wallet connect | ✅ |
| Real blockchain integration | 4 contracts on Cronos Testnet | ✅ |
| Multiple use cases | Registry, Workflows, Payments, Marketplace | ✅ |

**Why We Win Main Track:**
- Most comprehensive scope: 4 contracts vs typical 0-1
- Enables OTHER applications (infrastructure positioning)
- Complete x402 flow from agent discovery → payment → execution

---

### 💰 Track 2: Best Agentic Finance ($5,000)
**"AI Agent-Triggered Payments & Workflows"**

| Requirement | NEXUS-402 Implementation | Status |
|-------------|-------------------------|--------|
| Multi-step workflows | WorkflowEngine with 7 step types | ✅ |
| Agent-triggered payments | recordAgentCall() with payment | ✅ |
| Automated settlement | PaymentRouter.processX402Payment() | ✅ |
| DeFi integration ready | Workflow SWAP step for DEX integration | ✅ |
| AI coordination | Agents can call other agents via workflows | ✅ |

**Why We Win Agentic Finance:**
- Only project with on-chain workflow engine
- Agents can discover & pay each other through registry
- Multi-agent coordination via PARALLEL and CONDITION steps

---

### 🔗 Track 3: Best Ecosystem Integration ($3,000)
**"Cronos + Crypto.com Ecosystem"**

| Requirement | NEXUS-402 Implementation | Status |
|-------------|-------------------------|--------|
| Cronos EVM deployment | Chain ID 338, 4 contracts | ✅ |
| x402 protocol standard | EIP-3009 transferWithAuthorization | ✅ |
| USDC.e support | 0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a | ✅ |
| Block explorer integration | Links in dashboard | ✅ |
| Native Cronos token support | TCRO for gas | ✅ |
| **Crypto.com Market Data API** | Real-time prices, sentiment | ✅ |
| **Crypto.com AI Agent SDK** | NexusAgent class with 6 actions | ✅ |

**Why We Win Ecosystem Integration:**
- Deep Cronos integration (4 deployed contracts, 4 registered agents)
- **Crypto.com Market Data API** for real-time CRO/USD prices and sentiment
- **Crypto.com AI Agent SDK** pattern for intelligent agent actions
- Other hackathon projects can register agents in our protocol
- Standard x402 implementation enables interoperability

---

### 🛠 Track 4: Best Developer Tooling ($3,000)
**"Dev Tooling & Data Virtualization"**

| Requirement | NEXUS-402 Implementation | Status |
|-------------|-------------------------|--------|
| Developer SDKs | @nexus-402/sdk (TypeScript) | ✅ |
| CLI tooling | @nexus-402/cli with commands | ✅ |
| MCP integration | @nexus-402/mcp-server (10+ tools) | ✅ |
| REST API | Express.js with full CRUD | ✅ |
| TypeChain types | Generated from contracts | ✅ |
| Documentation | README, DEPLOYMENT, CONTRIBUTING | ✅ |

**Why We Win Developer Tooling:**
- 3 integration methods (SDK/CLI/MCP) vs competitors' 1
- 10+ MCP tools for AI assistant integration
- Complete TypeScript types from contract compilation

---

## 💻 Technical Implementation

### Smart Contracts (Solidity ^0.8.24)

```solidity
// NexusRegistry.sol - 450+ lines
- registerAgent(), getAgent(), getAllAgents()
- getAgentsByCapability() for discovery
- recordAgentCall() for reputation
- Protocol stats tracking

// WorkflowEngine.sol - 600+ lines
- createWorkflow() with step definitions
- executeWorkflow() with state management
- 7 step types: CALL_AGENT, TRANSFER, SWAP, CONDITION, PARALLEL, DELAY, CUSTOM
- Error handling and timeout control

// PaymentRouter.sol - 494 lines
- processX402Payment() - EIP-3009 gasless
- createSplitPayment() - multi-recipient
- createStreamingPayment() - time-based
- 6 payment types total

// AgentMarketplace.sol - 400+ lines
- createListing(), purchaseListing()
- Order management with escrow
- Rating and review system
```

### Developer Tools

```typescript
// SDK - 942 lines
export class NexusClient {
  agents: AgentService;
  workflows: WorkflowService;
  payments: PaymentService;
  marketplace: MarketplaceService;
}

// CLI - Full command suite
nexus agents list|register|call
nexus workflows create|execute
nexus payments x402|stream
nexus analytics overview

// MCP Server - 651 lines, 10+ tools
list_agents, get_agent, call_agent
create_workflow, execute_workflow
process_x402_payment, create_payment_stream
get_protocol_stats, browse_marketplace
```

### Frontend (Next.js 14)

- Real blockchain data (not mock)
- Live protocol stats with useProtocolStats()
- Agent list from useAgents() hook
- Block number tracking with useBlockNumber()
- Wallet connection via RainbowKit

---

## 🎯 Live Deployment

### Deployed Contracts

| Contract | Address | Verified |
|----------|---------|----------|
| **NexusRegistry** | `0xABA74d14F489F572ed6520950c7D2059F70F2444` | ✅ |
| **WorkflowEngine** | `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938` | ✅ |
| **PaymentRouter** | `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C` | ✅ |
| **AgentMarketplace** | `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81` | ✅ |

### Network Configuration

```
Network: Cronos Testnet
Chain ID: 338
RPC URL: https://evm-t3.cronos.org
Block Explorer: https://explorer.cronos.org/testnet
USDC.e: 0x8f4ae4b0a4e8fac07ab521c0d13e26400fe1ce1a
```

### Registered Demo Agents (LIVE ON-CHAIN)

| Agent | Capability | Price | Agent ID | TX Hash |
|-------|------------|-------|----------|---------|
| 🔮 **DeFi Price Oracle** | oracle, defi, pricing | 0.05 USDC | `0x01bd5541...` | [View →](https://explorer.cronos.org/testnet/tx/0x2e2f087eaf9ac349c68971cc096590228bb85c3f96ce006299c7904bacd14ea1) |
| 📊 **Sentiment Analyzer** | analytics, sentiment, social | 0.10 USDC | `0x835b24a3...` | [View →](https://explorer.cronos.org/testnet/tx/0x828e3af06b662b77770fc2be6c48b4b6b2bfb47db0694518999b7f340a506b08) |
| 💰 **Yield Optimizer** | defi, yield, optimization, staking | 0.15 USDC | `0x8df98f27...` | [View →](https://explorer.cronos.org/testnet/tx/0x3913db22d1d3983325072028765420e47ad8e1b7a14c0881224db0fb321524c3) |
| 🔐 **Smart Contract Auditor** | security, audit, contracts | 0.25 USDC | `0xcd33b4af...` | [View →](https://explorer.cronos.org/testnet/tx/0x856e040fd8ba032071feb8b6c39c47505b431b9b5f33cf6da2f1bc83f605bb70) |

**Full Agent IDs:**
- DeFi Price Oracle: `0x01bd5541c65a95e0a698678db9dfb6797a581aeeae410d80bf5155e17ca261ec`
- Sentiment Analyzer: `0x835b24a343bdc43e104ad57f2daf70d5af46389b284e4b4fb9fd7e6cf2db542c`
- Yield Optimizer: `0x8df98f2718a4ce51ce2bc7dd6fabd0d66354c94dd2a60e2cc81c5820a419e610`
- Smart Contract Auditor: `0xcd33b4af32e89469ac8e8296f576d149da4b3eecff8dc23a5af8c07734c3be1a`

---

## 🌐 Crypto.com Ecosystem Integration

### Market Data API Integration
We integrate directly with Crypto.com Exchange API for real-time market data:

```typescript
// Supported trading pairs
CRO_USD, BTC_USD, ETH_USD, USDC_USDT, CRO_BTC, CRO_ETH, SOL_USD, ATOM_USD, DOGE_USD, SHIB_USD

// Capabilities
- Real-time price feeds via getTicker()
- Market sentiment analysis via getMarketSentiment()
- OHLCV candlestick data via getCandlesticks()
- Full orderbook depth
```

### AI Agent SDK Pattern
Our NexusAgent class follows Crypto.com AI Agent SDK patterns:

```typescript
// 6 Agent Actions
- get_price: Fetch real-time cryptocurrency prices
- analyze_market: Multi-asset market analysis
- sentiment_analysis: Market sentiment scoring
- portfolio_recommendation: AI-powered portfolio suggestions
- defi_opportunity: Yield farming opportunities
- execute_trade: Payment execution via x402
```

### API Endpoints
```
GET  /api/market              - All tickers
GET  /api/market/ticker/:sym  - Single ticker
GET  /api/market/sentiment/:s - Sentiment score
GET  /api/market/cro          - CRO market data
GET  /api/market/pairs        - Supported pairs
POST /api/market/agent        - Execute agent action
GET  /api/market/agent/actions - Available actions
```

---

## 🎬 Demo Guide

### Quick Setup (2 minutes)

```bash
# Clone
git clone https://github.com/Tonyflam/hk.git
cd hk

# Install
pnpm install

# Terminal 1: Backend
cd apps/backend && npx tsx src/index.ts

# Terminal 2: Frontend
cd apps/frontend && pnpm dev

# Open http://localhost:3000
```

### Demo Flow for Video

1. **Dashboard** (`/`) 
   - Show live blockchain data
   - Contract deployment status
   - Protocol statistics

2. **x402 Demo** (`/x402-demo`)
   - Walk through payment flow
   - Show EIP-3009 signature
   - Demonstrate gasless payment

3. **Agents** (`/agents`)
   - Browse registered agents
   - Show on-chain data

4. **Register Agent** (`/agents/register`)
   - Fill registration form
   - Submit transaction
   - Show confirmation

5. **Workflows** (`/workflows`)
   - Explain workflow capabilities
   - Show step types

6. **Analytics** (`/analytics`)
   - Protocol metrics
   - Contract status grid

### Key Talking Points

1. "NEXUS-402 is the universal orchestration layer for AI agents on Cronos"
2. "4 deployed smart contracts, not just a frontend"
3. "Other hackathon projects can register their agents in our protocol"
4. "Complete developer tooling: SDK, CLI, and MCP server"
5. "6 payment types with x402 support"

---

## ✅ Judging Criteria Checklist

### Innovation ⭐⭐⭐⭐⭐
- [x] First universal agent orchestration protocol on x402
- [x] WorkflowEngine for multi-step automation (unique)
- [x] 6 payment types in single router
- [x] MCP server for AI assistant integration

### Agentic Functionality ⭐⭐⭐⭐⭐
- [x] On-chain agent registry with reputation
- [x] Workflow engine with 7 step types
- [x] Agents can discover and pay each other
- [x] Multi-agent coordination via workflows

### Execution Quality ⭐⭐⭐⭐⭐
- [x] 4 deployed smart contracts
- [x] TypeScript throughout (100% type-safe)
- [x] Professional Next.js 14 frontend
- [x] Comprehensive documentation
- [x] Clean code architecture

### Ecosystem Value ⭐⭐⭐⭐⭐
- [x] Other projects can integrate
- [x] USDC.e adoption driver
- [x] Reference implementation for x402
- [x] Developer SDK for ecosystem growth

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **GitHub Repository** | [github.com/Tonyflam/hk](https://github.com/Tonyflam/hk) |
| **NexusRegistry** | [View on Explorer →](https://explorer.cronos.org/testnet/address/0xABA74d14F489F572ed6520950c7D2059F70F2444) |
| **WorkflowEngine** | [View on Explorer →](https://explorer.cronos.org/testnet/address/0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938) |
| **PaymentRouter** | [View on Explorer →](https://explorer.cronos.org/testnet/address/0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C) |
| **AgentMarketplace** | [View on Explorer →](https://explorer.cronos.org/testnet/address/0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81) |

---

<div align="center">

### 🏆 Built for the Cronos x402 Paytech Hackathon

**The Universal x402 Orchestration Protocol**

*Targeting: $35,000 total prize pool across all 4 tracks*

---

**NEXUS-402: Infrastructure for the Agentic Economy**

</div>
