'use client';

import { Header } from '@/components/Header';
import { StatCard } from '@/components/Cards';
import { Workflow, ExternalLink, Zap, GitBranch, Plus } from 'lucide-react';
import Link from 'next/link';
import { useProtocolStats } from '@/lib/hooks';
import { CONTRACTS, CRONOS_TESTNET } from '@/lib/contracts';

export default function WorkflowsPage() {
  const stats = useProtocolStats();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Workflow Engine</h1>
            <p className="text-white/60">Automate multi-step AI agent processes</p>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Available Agents"
            value={stats.totalAgents.toString()}
            icon={<Workflow className="w-6 h-6 text-purple-400" />}
          />
          <StatCard
            title="Total Calls"
            value={stats.totalCalls.toString()}
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
          />
          <StatCard
            title="Current Block"
            value={`#${stats.blockNumber.toLocaleString()}`}
            icon={<GitBranch className="w-6 h-6 text-green-400" />}
          />
        </div>

        {/* Deployed Contract */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Workflow Engine Contract</h2>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-sm text-white/60">WorkflowEngine.sol</p>
              <code className="text-cronos-light text-sm font-mono">
                {CONTRACTS.WORKFLOW_ENGINE}
              </code>
            </div>
            <a 
              href={`${CRONOS_TESTNET.blockExplorer}/address/${CONTRACTS.WORKFLOW_ENGINE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cronos-light hover:underline"
            >
              View on Explorer <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Workflow Templates */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Workflow Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <div className="w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center mb-3">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-semibold mb-1">Sequential Steps</h3>
              <p className="text-sm text-white/60">
                Chain multiple agent calls in order, passing data between steps
              </p>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded mt-2 inline-block">
                Contract Ready
              </span>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center mb-3">
                <span className="text-xl">🔀</span>
              </div>
              <h3 className="font-semibold mb-1">Conditional Logic</h3>
              <p className="text-sm text-white/60">
                Branch workflows based on agent outputs and conditions
              </p>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded mt-2 inline-block">
                Contract Ready
              </span>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="w-10 h-10 rounded-lg bg-green-500/30 flex items-center justify-center mb-3">
                <span className="text-xl">💸</span>
              </div>
              <h3 className="font-semibold mb-1">Aggregated Payments</h3>
              <p className="text-sm text-white/60">
                Single x402 payment covers all agents in the workflow
              </p>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded mt-2 inline-block">
                Contract Ready
              </span>
            </div>
          </div>
        </div>

        {/* Example Workflow */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Example: DeFi Analytics Workflow</h2>
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            <div className="flex-shrink-0 p-4 bg-cronos-light/20 rounded-lg border border-cronos-light/30 min-w-[180px]">
              <p className="text-xs text-white/60 mb-1">Step 1</p>
              <p className="font-semibold">Price Oracle</p>
              <p className="text-sm text-white/60">Fetch token prices</p>
            </div>
            <div className="flex-shrink-0 text-2xl text-white/40">→</div>
            <div className="flex-shrink-0 p-4 bg-purple-500/20 rounded-lg border border-purple-500/30 min-w-[180px]">
              <p className="text-xs text-white/60 mb-1">Step 2</p>
              <p className="font-semibold">Sentiment Analysis</p>
              <p className="text-sm text-white/60">Analyze market mood</p>
            </div>
            <div className="flex-shrink-0 text-2xl text-white/40">→</div>
            <div className="flex-shrink-0 p-4 bg-green-500/20 rounded-lg border border-green-500/30 min-w-[180px]">
              <p className="text-xs text-white/60 mb-1">Step 3</p>
              <p className="font-semibold">Strategy Agent</p>
              <p className="text-sm text-white/60">Generate advice</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-xl p-8 text-center">
          <Workflow className="w-16 h-16 mx-auto mb-4 text-cronos-light" />
          <h2 className="text-2xl font-bold mb-2">Build Your Workflow</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            The WorkflowEngine smart contract is deployed and ready.
            Combine registered agents to create powerful automations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/agents" className="btn-primary inline-flex items-center gap-2">
              Browse Agents
            </Link>
            <a 
              href={`${CRONOS_TESTNET.blockExplorer}/address/${CONTRACTS.WORKFLOW_ENGINE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2"
            >
              View Contract <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
