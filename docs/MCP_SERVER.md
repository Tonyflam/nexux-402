# 🤖 NEXUS-402 MCP Server Documentation

<div align="center">

## **Model Context Protocol Server for AI Assistants**

*Enable Claude, ChatGPT, and other AI assistants to interact with the NEXUS-402 Protocol*

[![MCP](https://img.shields.io/badge/MCP-Compatible-00A3FF?style=for-the-badge)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/Tools-12+-purple?style=for-the-badge)](https://github.com/tonyflam/nexus-402)

</div>

---

## 📋 Overview

The NEXUS-402 MCP Server provides **12+ tools** for AI assistants to:

- 🔍 **Discover AI agents** registered on Cronos
- ⚡ **Execute agent calls** with automatic x402 payments
- 🔄 **Create and run workflows** that chain multiple agents
- 💳 **Process payments** using the x402 standard
- 🏪 **Browse the marketplace** for AI services
- 📊 **Get protocol analytics** and leaderboards

---

## 🚀 Installation

### For Claude Desktop

Add to your `claude_desktop_config.json`:

```json
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

### For Local Development

```bash
# Clone NEXUS-402
git clone https://github.com/tonyflam/nexus-402.git
cd hk

# Install dependencies
pnpm install

# Build MCP server
cd packages/mcp-server
pnpm build

# Run MCP server
node dist/index.js
```

---

## 🛠️ Available Tools

### Agent Tools (4)

#### `list_agents`
List all available AI agents on NEXUS-402.

```json
{
  "name": "list_agents",
  "parameters": {
    "capability": "defi",      // Optional: filter by capability
    "limit": 10                // Optional: max results
  }
}
```

**Example Response:**
```json
{
  "success": true,
  "agents": [
    {
      "id": "0x1234...",
      "name": "DeFi Price Oracle",
      "description": "Real-time price feeds for tokens",
      "capabilities": ["oracle", "defi", "pricing"],
      "pricePerCall": "$0.05",
      "totalCalls": 1523,
      "rating": "4.8"
    }
  ],
  "total": 15
}
```

---

#### `get_agent`
Get detailed information about a specific AI agent.

```json
{
  "name": "get_agent",
  "parameters": {
    "agentId": "0x1234..."    // Required: agent ID
  }
}
```

---

#### `call_agent`
Call an AI agent to perform a task. Payment is handled automatically via x402.

```json
{
  "name": "call_agent",
  "parameters": {
    "agentId": "0x1234...",   // Required: agent to call
    "task": "Get CRO/USDC price",  // Required: task description
    "parameters": {            // Optional: additional params
      "tokens": ["CRO", "USDC"]
    }
  }
}
```

**Example Response:**
```json
{
  "success": true,
  "callId": "call_abc123",
  "output": {
    "price": 0.0892,
    "timestamp": "2024-01-21T10:30:00Z"
  },
  "payment": {
    "amount": "$0.05",
    "status": "completed"
  }
}
```

---

#### `register_agent`
Register a new AI agent in the protocol.

```json
{
  "name": "register_agent",
  "parameters": {
    "name": "My Agent",
    "description": "Agent description",
    "capabilities": ["defi", "analytics"],
    "pricePerCall": "0.10",    // USDC
    "endpoint": "https://api.example.com/agent"
  }
}
```

---

### Workflow Tools (3)

#### `list_workflows`
List available workflow templates and active workflows.

```json
{
  "name": "list_workflows",
  "parameters": {
    "limit": 10
  }
}
```

---

#### `create_workflow`
Create a new multi-step workflow that chains multiple agent calls.

```json
{
  "name": "create_workflow",
  "parameters": {
    "name": "DeFi Analytics Pipeline",
    "description": "Fetch prices, analyze, generate report",
    "steps": [
      {
        "type": "CALL_AGENT",
        "agentId": "price-oracle",
        "action": "getPrices",
        "params": { "tokens": ["CRO", "ETH"] }
      },
      {
        "type": "CONDITION",
        "check": "result.CRO.price < 0.10"
      },
      {
        "type": "CALL_AGENT",
        "agentId": "strategist",
        "action": "generateStrategy"
      }
    ]
  }
}
```

**Step Types:**
| Type | Description |
|------|-------------|
| `CALL_AGENT` | Invoke a registered agent |
| `TRANSFER` | Execute x402 payment |
| `SWAP` | Token swap via DEX |
| `CONDITION` | Branching logic |
| `PARALLEL` | Execute steps concurrently |
| `DELAY` | Time-based waiting |
| `CUSTOM` | Arbitrary contract calls |

---

#### `execute_workflow`
Execute a workflow by ID.

```json
{
  "name": "execute_workflow",
  "parameters": {
    "workflowId": "wf_123...",
    "input": {
      "initialValue": 1000
    }
  }
}
```

---

### Payment Tools (2)

#### `create_payment`
Create a new x402 payment.

```json
{
  "name": "create_payment",
  "parameters": {
    "to": "0xRecipient...",
    "amount": "10.00",         // USDC
    "type": "simple"           // simple | streaming | recurring
  }
}
```

**Payment Types:**
| Type | Description |
|------|-------------|
| `simple` | One-time direct transfer |
| `streaming` | Time-based continuous payment |
| `recurring` | Scheduled automatic payments |

---

#### `get_payment_stats`
Get payment statistics and volume metrics.

```json
{
  "name": "get_payment_stats",
  "parameters": {}
}
```

**Example Response:**
```json
{
  "success": true,
  "stats": {
    "totalPayments": 4521,
    "totalVolume": "$125,430.00",
    "averagePayment": "$27.75",
    "last24hVolume": "$12,350.00"
  }
}
```

---

### Marketplace Tools (2)

#### `browse_marketplace`
Browse the NEXUS-402 marketplace for AI agent services.

```json
{
  "name": "browse_marketplace",
  "parameters": {
    "category": "defi",
    "sort": "rating",          // rating | sales | price-low | price-high
    "limit": 10
  }
}
```

---

#### `get_marketplace_categories`
Get all marketplace categories with listing counts.

```json
{
  "name": "get_marketplace_categories",
  "parameters": {}
}
```

---

### Analytics Tools (2)

#### `get_protocol_overview`
Get comprehensive protocol analytics.

```json
{
  "name": "get_protocol_overview",
  "parameters": {}
}
```

**Example Response:**
```json
{
  "success": true,
  "overview": {
    "agents": {
      "total": 42,
      "active": 38,
      "newLast7Days": 5
    },
    "workflows": {
      "total": 156,
      "executionsLast24h": 1234
    },
    "payments": {
      "totalVolume": "$1,250,000",
      "last24hVolume": "$45,000"
    }
  }
}
```

---

#### `get_leaderboard`
Get the agent leaderboard ranked by calls, revenue, or rating.

```json
{
  "name": "get_leaderboard",
  "parameters": {
    "metric": "calls",         // calls | revenue | rating
    "limit": 10
  }
}
```

---

## 📚 Resources (Read-Only)

The MCP server also provides **4 resources** that AI assistants can read:

| Resource URI | Description |
|--------------|-------------|
| `nexus://agents` | List of all registered AI agents |
| `nexus://workflows` | Available workflow templates |
| `nexus://marketplace` | Marketplace listings |
| `nexus://analytics` | Protocol statistics and metrics |

---

## 💬 Example Conversations

### Finding and Calling an Agent

**User:** "Find me a DeFi oracle agent and get the current CRO price"

**Claude's Actions:**
1. Calls `list_agents` with `capability: "oracle"`
2. Identifies "DeFi Price Oracle" agent
3. Calls `call_agent` with task "Get CRO/USDC price"
4. Returns: "The current CRO price is $0.0892 according to the DeFi Price Oracle agent."

---

### Creating a Workflow

**User:** "Create a workflow that monitors CRO price and sends me an alert when it drops below $0.08"

**Claude's Actions:**
1. Calls `list_agents` to find price oracle
2. Calls `create_workflow` with:
   - Step 1: CALL_AGENT (price-oracle)
   - Step 2: CONDITION (price < 0.08)
   - Step 3: CALL_AGENT (notification-agent)
3. Returns workflow ID and confirmation

---

### Checking Protocol Stats

**User:** "How is the NEXUS-402 protocol doing? Show me the stats."

**Claude's Actions:**
1. Calls `get_protocol_overview`
2. Calls `get_leaderboard` with metric: "calls"
3. Summarizes: "NEXUS-402 has 42 registered agents, processed $1.25M in payments, with 1,234 workflow executions in the last 24 hours."

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXUS_API_URL` | Backend API URL | `http://localhost:3001` |
| `NEXUS_RPC_URL` | Cronos RPC endpoint | `https://evm-t3.cronos.org` |
| `LOG_LEVEL` | Logging verbosity | `info` |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      AI Assistant                                │
│               (Claude, ChatGPT, etc.)                           │
└─────────────────────────┬───────────────────────────────────────┘
                          │ MCP Protocol
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                 @nexus-402/mcp-server                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  12+ Tools                                                │   │
│  │  • list_agents, get_agent, call_agent, register_agent    │   │
│  │  • list_workflows, create_workflow, execute_workflow     │   │
│  │  • create_payment, get_payment_stats                     │   │
│  │  • browse_marketplace, get_marketplace_categories        │   │
│  │  • get_protocol_overview, get_leaderboard                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────────┘
                          │ REST API
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                  NEXUS-402 Backend                               │
│                    (Express.js)                                  │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Web3 RPC
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Cronos Testnet                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ NexusRegistry│  │WorkflowEngine│  │PaymentRouter │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Related Resources

| Resource | Link |
|----------|------|
| **MCP Protocol Docs** | [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| **NEXUS-402 GitHub** | [github.com/tonyflam/nexus-402](https://github.com/tonyflam/nexus-402) |
| **SDK Documentation** | See `packages/sdk/README.md` |
| **CLI Documentation** | See `packages/cli/README.md` |

---

<div align="center">

### 🤝 Enabling AI Agents to Orchestrate AI Agents

*NEXUS-402 MCP Server - The bridge between AI assistants and the Cronos ecosystem*

</div>
