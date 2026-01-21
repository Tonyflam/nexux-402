'use client';

import { Header } from '@/components/Header';
import { StatCard } from '@/components/Cards';
import { Store, ExternalLink, Users, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useProtocolStats, useAgents } from '@/lib/hooks';
import { CONTRACTS, CRONOS_TESTNET } from '@/lib/contracts';

export default function MarketplacePage() {
  const stats = useProtocolStats();
  const { agents, loading } = useAgents();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Agent Marketplace</h1>
            <p className="text-white/60">Discover and purchase AI agent services</p>
          </div>
          <Link 
            href="/agents/register" 
            className="btn-primary flex items-center gap-2 w-fit"
          >
            <Store className="w-4 h-4" /> List Your Agent
          </Link>
        </div>

        {/* Live Stats from Blockchain */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Listed Agents"
            value={stats.totalAgents.toString()}
            icon={<Store className="w-6 h-6 text-cronos-light" />}
          />
          <StatCard
            title="Total Calls"
            value={stats.totalCalls.toString()}
            icon={<ShoppingCart className="w-6 h-6 text-green-400" />}
          />
          <StatCard
            title="Volume (USDC)"
            value={`$${stats.totalVolume}`}
            icon={<Users className="w-6 h-6 text-purple-400" />}
          />
        </div>

        {/* Deployed Contract */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Marketplace Contract</h2>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-sm text-white/60">AgentMarketplace.sol</p>
              <code className="text-cronos-light text-sm font-mono">
                {CONTRACTS.AGENT_MARKETPLACE}
              </code>
            </div>
            <a 
              href={`${CRONOS_TESTNET.blockExplorer}/address/${CONTRACTS.AGENT_MARKETPLACE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cronos-light hover:underline"
            >
              View on Explorer <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Registered Agents from Blockchain */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Registered Agents (On-Chain)</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 bg-white/5 rounded-lg animate-pulse">
                  <div className="h-6 bg-white/10 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : agents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <p className="text-sm text-white/60">{agent.description}</p>
                    </div>
                    <span className="text-cronos-light font-bold">${agent.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {agent.capabilities.map((cap: string) => (
                      <span key={cap} className="text-xs bg-cronos-light/20 text-cronos-light px-2 py-0.5 rounded">
                        {cap}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-2 font-mono truncate">
                    ID: {agent.id}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Store className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <p className="text-white/60">No agents registered yet</p>
              <Link href="/agents/register" className="text-cronos-light hover:underline text-sm">
                Register the first agent →
              </Link>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">How the Marketplace Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cronos-light/20 flex items-center justify-center text-xl">
                1
              </div>
              <h3 className="font-semibold mb-1">Register Agent</h3>
              <p className="text-sm text-white/60">
                List your AI agent on-chain with capabilities and pricing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cronos-light/20 flex items-center justify-center text-xl">
                2
              </div>
              <h3 className="font-semibold mb-1">Users Discover</h3>
              <p className="text-sm text-white/60">
                Buyers browse and find agents that match their needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cronos-light/20 flex items-center justify-center text-xl">
                3
              </div>
              <h3 className="font-semibold mb-1">Pay with x402</h3>
              <p className="text-sm text-white/60">
                Gasless USDC payments directly to agent owners
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
