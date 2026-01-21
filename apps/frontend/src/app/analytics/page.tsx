'use client';

import { Header } from '@/components/Header';
import { StatCard } from '@/components/Cards';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, ExternalLink, Database } from 'lucide-react';
import { useProtocolStats, useAgents, useBlockNumber } from '@/lib/hooks';
import { CONTRACTS, CRONOS_TESTNET } from '@/lib/contracts';

export default function AnalyticsPage() {
  const stats = useProtocolStats();
  const { agents } = useAgents();
  const blockNumber = useBlockNumber();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Protocol Analytics</h1>
          <p className="text-white/60">Real-time on-chain metrics from Cronos Testnet</p>
        </div>

        {/* Live Network Status */}
        <div className="glass rounded-xl p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="font-semibold">Live on Cronos Testnet</span>
            <span className="text-white/60">Block #{blockNumber.toLocaleString()}</span>
          </div>
          <span className="text-sm text-white/60">Chain ID: 338</span>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Agents"
            value={stats.totalAgents.toString()}
            icon={<Users className="w-6 h-6 text-cronos-light" />}
          />
          <StatCard
            title="Total Calls"
            value={stats.totalCalls.toString()}
            icon={<Activity className="w-6 h-6 text-green-400" />}
          />
          <StatCard
            title="Total Volume"
            value={`$${stats.totalVolume}`}
            icon={<DollarSign className="w-6 h-6 text-yellow-400" />}
          />
          <StatCard
            title="Contracts"
            value="4"
            icon={<Database className="w-6 h-6 text-purple-400" />}
          />
        </div>

        {/* Contract Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Deployed Contracts */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Deployed Contracts</h2>
            <div className="space-y-3">
              {[
                { name: 'NexusRegistry', address: CONTRACTS.NEXUS_REGISTRY, status: 'Active' },
                { name: 'WorkflowEngine', address: CONTRACTS.WORKFLOW_ENGINE, status: 'Active' },
                { name: 'PaymentRouter', address: CONTRACTS.PAYMENT_ROUTER, status: 'Active' },
                { name: 'AgentMarketplace', address: CONTRACTS.AGENT_MARKETPLACE, status: 'Active' },
              ].map((contract) => (
                <div key={contract.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div>
                      <p className="font-medium">{contract.name}</p>
                      <code className="text-xs text-white/40">{contract.address.slice(0, 10)}...{contract.address.slice(-8)}</code>
                    </div>
                  </div>
                  <a 
                    href={`${CRONOS_TESTNET.blockExplorer}/address/${contract.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cronos-light hover:underline text-sm flex items-center gap-1"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Agents */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Registered Agents</h2>
            {agents.length > 0 ? (
              <div className="space-y-3">
                {agents.map((agent, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{agent.name}</p>
                      <span className="text-cronos-light font-bold">${agent.price}/call</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((cap: string) => (
                        <span key={cap} className="text-xs bg-cronos-light/20 text-cronos-light px-2 py-0.5 rounded">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/60">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No agents registered yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Protocol Health */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Protocol Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <p className="font-semibold text-green-400">Contracts</p>
              <p className="text-sm text-white/60">All deployed</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <p className="font-semibold text-green-400">Network</p>
              <p className="text-sm text-white/60">Cronos Testnet</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <p className="font-semibold text-green-400">Registry</p>
              <p className="text-sm text-white/60">{stats.totalAgents} agents</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-cronos-light/20 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="font-semibold text-cronos-light">x402</p>
              <p className="text-sm text-white/60">Ready</p>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="text-center text-sm text-white/40">
          <p>
            All data is fetched live from deployed smart contracts on Cronos Testnet.
          </p>
          <p className="mt-1">
            RPC: <code className="text-cronos-light">{CRONOS_TESTNET.rpcUrl}</code>
          </p>
        </div>
      </main>
    </div>
  );
}
