# Contributing to NEXUS-402

Thank you for your interest in contributing to NEXUS-402! 🚀

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/tonyflam/nexus-402.git
cd hk

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Running Locally

```bash
# Start backend (Terminal 1)
cd apps/backend && npx tsx src/index.ts

# Start frontend (Terminal 2)
cd apps/frontend && pnpm dev
```

## Project Structure

```
hk/
├── contracts/          # Solidity smart contracts
├── apps/
│   ├── backend/        # Express.js API
│   ├── frontend/       # Next.js dashboard
│   └── demo-agents/    # Demo AI agents
└── packages/
    ├── sdk/            # TypeScript SDK
    ├── cli/            # CLI tool
    └── mcp-server/     # MCP server
```

## Development Guidelines

### Code Style

- Use TypeScript for all JavaScript code
- Use Prettier for formatting
- Follow existing code patterns

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add new payment streaming feature
fix: resolve wallet connection issue
docs: update README with deployment info
```

### Testing

```bash
# Run contract tests
cd contracts && npx hardhat test

# Type check frontend
cd apps/frontend && npx tsc --noEmit
```

## Smart Contract Development

### Compile Contracts

```bash
cd contracts
npx hardhat compile
```

### Deploy to Testnet

```bash
npx hardhat run scripts/deploy.ts --network cronos-testnet
```

## Questions?

Open an issue on GitHub for any questions or suggestions.

---

*Built for the Cronos x402 Paytech Hackathon*
