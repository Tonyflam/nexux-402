# 🎬 NEXUS-402 Demo Recording Script

## Pre-Recording Checklist
- [ ] Terminal ready with `pnpm dev` running
- [ ] Browser open to `http://localhost:3000`
- [ ] MetaMask installed and connected to Cronos Testnet
- [ ] Have some TCRO in wallet for demo
- [ ] Screen recording software ready (OBS, Loom, etc.)
- [ ] Clean browser (no other tabs visible)
- [ ] Desktop notifications disabled

## Video Structure (Target: 3-4 minutes)

---

### Part 1: Opening Hook (30 seconds)
**What to say:**
> "NEXUS-402 is the Universal x402 Orchestration Protocol for Cronos. Unlike other hackathon projects that are single-purpose apps, NEXUS-402 is the infrastructure layer that ALL AI agents can build on."

**What to show:**
1. Open homepage at `http://localhost:3000`
2. Point to the LIVE ticker showing "LIVE ON CRONOS TESTNET"
3. Scroll to show the 4 deployed smart contracts
4. Click one contract to show it's real on Cronos Explorer

---

### Part 2: Live On-Chain Agents (45 seconds)
**What to say:**
> "We have 4 AI agents registered on-chain right now. These are real - you can verify them on the blockchain explorer."

**What to show:**
1. Navigate to `/agents` page
2. Show the agents loading from the blockchain (the green "Loaded from registry" badge)
3. Click on one agent to show details
4. Point out:
   - On-chain agent ID
   - Capabilities
   - Price per call
   - Registration transaction hash

**Click the Explorer links to prove it's real**

---

### Part 3: x402 Payment Demo (90 seconds) ⭐ MOST IMPORTANT
**What to say:**
> "Now let me show you how x402 payments work. I'll pay for an AI agent service using USDC - gasless and instant."

**What to show:**
1. Navigate to `/x402-demo`
2. Click "Connect Wallet" - show MetaMask popup
3. See the agents listed - point out "Loaded from on-chain registry"
4. Select "DeFi Price Oracle" agent ($0.10 USDC)
5. Click Approve - explain this allows PaymentRouter to spend USDC
6. Click Pay & Execute - show the loading state
7. See the success screen with:
   - Transaction hash
   - Agent response (price data)
   - "Copy" and "View on Explorer" links

**What to say:**
> "The payment happened via x402 - gasless for the user. The agent received payment and returned real market data."

---

### Part 4: Developer Tools (45 seconds)
**What to say:**
> "For developers, we provide a complete toolkit: SDK, CLI, and MCP server for AI assistants."

**What to show:**
1. Open a code editor or terminal
2. Show SDK code example:
```typescript
import { NexusClient } from '@nexus-402/sdk';

const client = new NexusClient({ rpcUrl: 'https://evm-t3.cronos.org' });

// Register an agent
const agent = await client.agents.register({
  name: 'My AI Agent',
  capabilities: ['payments', 'analytics'],
  pricePerCall: '100000'
});

// Process x402 payment
const payment = await client.payments.createX402({
  to: agent.paymentAddress,
  amount: '1000000'
});
```

3. Mention: "We also have MCP tools for Claude and other AI assistants"

---

### Part 5: Why NEXUS-402 Wins (30 seconds)
**What to say:**
> "Let me show you why NEXUS-402 is different from other submissions."

**What to show:**
1. Quick comparison table (can show from README or slide):

| Feature | NEXUS-402 | Typical Project |
|---------|-----------|-----------------|
| Smart Contracts | 4 deployed | 0-1 |
| Payment Types | 6 | 1-2 |
| Developer Tools | SDK+CLI+MCP | None |
| On-Chain Registry | ✅ | ❌ |

**What to say:**
> "Other projects are applications. NEXUS-402 is the platform they can build ON. Any AI agent can register in our protocol. Any payment can flow through our router."

---

### Part 6: Closing (15 seconds)
**What to say:**
> "NEXUS-402 - the Universal x402 Orchestration Protocol for Cronos. Infrastructure, not just an application. Thank you!"

**What to show:**
1. Return to homepage
2. Show the live activity feed with real transactions
3. End on the contract deployment section

---

## Technical Notes for Recording

### If something goes wrong:
- If wallet doesn't connect: Refresh the page, try again
- If agents don't load: The fallback demo agents will show
- If transaction fails: Say "let me try again" - it's realistic!

### URLs to have open:
1. `http://localhost:3000` - Main dashboard
2. `http://localhost:3000/x402-demo` - Payment demo
3. `http://localhost:3000/agents` - Agent registry
4. `https://explorer.cronos.org/testnet/address/0xABA74d14F489F572ed6520950c7D2059F70F2444` - NexusRegistry on explorer

### Contract addresses to mention:
- NexusRegistry: `0xABA74d14F489F572ed6520950c7D2059F70F2444`
- WorkflowEngine: `0xd055511F2f204ea0dD1c0D69D9bF76Bc1C5D3938`
- PaymentRouter: `0x34096A7821a2EFE7996C1223fc9d81ACd188Ca3C`
- AgentMarketplace: `0xBf13838ffe1cc686D2f1f088fdfE8D8301782D81`

### Transaction hashes (real, on-chain):
- DeFi Price Oracle registration: `0x2e2f087eaf9ac349c68971cc096590228bb85c3f96ce006299c7904bacd14ea1`
- Sentiment Analyzer registration: `0x828e3af06b662b77770fc2be6c48b4b6b2bfb47db0694518999b7f340a506b08`
- Yield Optimizer registration: `0x3913db22d1d3983325072028765420e47ad8e1b7a14c0881224db0fb321524c3`
- Smart Contract Auditor registration: `0x856e040fd8ba032071feb8b6c39c47505b431b9b5f33cf6da2f1bc83f605bb70`

---

## Key Talking Points to Emphasize

1. **"4 smart contracts deployed"** - More than any competitor
2. **"Real on-chain data"** - Not mocked, verifiable
3. **"Platform, not application"** - Other projects can use us
4. **"Complete developer story"** - SDK, CLI, MCP
5. **"x402 native"** - Gasless, instant payments
6. **"Cronos ecosystem"** - Deep integration with Crypto.com

---

## After Recording

### ✅ DEMO VIDEO UPLOADED!

🎬 **YouTube Demo:** https://youtu.be/K8bI92NpbHc

### Submission Links:
- GitHub: https://github.com/tonyflam/nexus-402
- Demo Video: https://youtu.be/K8bI92NpbHc
- Contracts: https://explorer.cronos.org/testnet/address/0xABA74d14F489F572ed6520950c7D2059F70F2444

Good luck! 🚀
