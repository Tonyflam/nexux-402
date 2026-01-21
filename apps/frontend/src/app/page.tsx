'use client';

import { Header } from '@/components/Header';
import { StatCard } from '@/components/Cards';
import { 
  LiveTicker, 
  DeploymentProof, 
  LiveActivityFeed, 
  EconomicMetrics 
} from '@/components/LiveDashboard';
import { Bot, Workflow, CreditCard, TrendingUp, ArrowRight, Zap, Shield, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useProtocolStats, useBlockNumber, useWallet, useAgents } from '@/lib/hooks';
import { CONTRACTS, CRONOS_EXPLORER } from '@/lib/contracts';

export default function Dashboard() {
  // Real blockchain data hooks
  const protocolStats = useProtocolStats();
  const blockNumber = useBlockNumber();
  const { address, isConnected } = useWallet();
  const { agents, loading } = useAgents();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* LIVE TICKER - Shows this is REAL and DEPLOYED */}
        <LiveTicker />

        {/* Hero Section */}
        <div className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cronos-light/20 to-primary-600/20" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30">
                ✓ Deployed on Cronos Testnet
              </span>
              <span className="px-3 py-1 rounded-full bg-cronos/20 text-cronos-light text-sm font-medium border border-cronos/30">
                Block #{blockNumber.toLocaleString()}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to <span className="gradient-text">NEXUS-402</span>
            </h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl">
              The Universal x402 Orchestration Protocol & Agent Marketplace for Cronos. 
              Connect AI agents, automate workflows, and process crypto payments seamlessly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/agents" className="btn-primary flex items-center gap-2">
                Explore Agents <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/payments" className="btn-secondary flex items-center gap-2">
                Try x402 Payment <Zap className="w-4 h-4" />
              </Link>
              <a 
                href={`${CRONOS_EXPLORER}/address/${CONTRACTS.NEXUS_REGISTRY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                View on Explorer <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* LIVE Economic Metrics - REAL BLOCKCHAIN DATA */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Protocol Metrics
          </h2>
          <EconomicMetrics />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 rounded-lg bg-cronos-light/20 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-cronos-light" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Agent Registry</h3>
            <p className="text-sm text-white/60">
              Discover and connect with specialized AI agents for DeFi, payments, analytics, and more.
            </p>
          </div>
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Workflow className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Workflow Automation</h3>
            <p className="text-sm text-white/60">
              Create multi-step workflows that chain agent calls with conditional logic.
            </p>
          </div>
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">x402 Payments</h3>
            <p className="text-sm text-white/60">
              Gasless USDC payments with streaming, splits, and recurring options.
            </p>
          </div>
        </div>

        {/* Two Column Layout - Activity + Deployment Proof */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LiveActivityFeed />
          <DeploymentProof />
        </div>

        {/* Stats Grid - Using REAL blockchain data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Agents"
            value={protocolStats.totalAgents}
            change="On-chain verified"
            changeType="positive"
            icon={<Bot className="w-6 h-6 text-cronos-light" />}
          />
          <StatCard
            title="API Calls"
            value={protocolStats.totalCalls}
            change="Protocol calls"
            changeType="positive"
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
          />
          <StatCard
            title="Total Volume"
            value={`$${protocolStats.totalVolume}`}
            change="USDC processed"
            changeType="positive"
            icon={<CreditCard className="w-6 h-6 text-green-400" />}
          />
          <StatCard
            title="Block Height"
            value={blockNumber.toLocaleString()}
            change="Cronos Testnet"
            changeType="neutral"
            icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
          />
        </div>

        {/* Agents Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Registered Agents</h2>
              <p className="text-white/60">Live from NexusRegistry contract</p>
            </div>
            <Link href="/agents" className="text-cronos-light hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="glass rounded-xl p-6 animate-pulse">
                  <div className="w-12 h-12 rounded-lg bg-white/10 mb-4" />
                  <div className="h-6 bg-white/10 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-full mb-4" />
                  <div className="h-8 bg-white/10 rounded" />
                </div>
              ))
            ) : agents.length > 0 ? (
              agents.map((agent, index) => (
                <div key={index} className="glass rounded-xl p-6 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cronos-light/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-cronos-light" />
                    </div>
                    <span className="text-cronos-light font-bold">${agent.price}/call</span>
                  </div>
                  <h3 className="font-semibold mb-1">{agent.name}</h3>
                  <p className="text-sm text-white/60 mb-3 line-clamp-2">{agent.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 3).map((cap: string) => (
                      <span key={cap} className="text-xs bg-cronos-light/20 text-cronos-light px-2 py-0.5 rounded">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 glass rounded-xl p-12 text-center">
                <Bot className="w-12 h-12 mx-auto mb-4 text-white/40" />
                <p className="text-white/60">No agents registered yet</p>
                <Link href="/agents/register" className="btn-primary mt-4 inline-block">
                  Register First Agent
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Quick Actions</h2>
              <p className="text-white/60">Get started with NEXUS-402</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/x402-demo" className="glass rounded-xl p-6 card-hover border border-cronos-light/30 hover:border-cronos-light">
              <div className="w-12 h-12 rounded-lg bg-cronos-light/20 flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-cronos-light" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Try x402 Payment</h3>
              <p className="text-sm text-white/60">
                Experience gasless USDC payments on Cronos
              </p>
            </Link>
            <Link href="/agents/register" className="glass rounded-xl p-6 card-hover border border-purple-500/30 hover:border-purple-500">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Register Agent</h3>
              <p className="text-sm text-white/60">
                List your AI agent on the blockchain
              </p>
            </Link>
            <Link href="/workflows" className="glass rounded-xl p-6 card-hover border border-green-500/30 hover:border-green-500">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Explore Workflows</h3>
              <p className="text-sm text-white/60">
                See how to automate agent processes
              </p>
            </Link>
          </div>
        </div>

        {/* Protocol Features */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Why NEXUS-402?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cronos-light/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-cronos-light" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gasless Payments</h3>
              <p className="text-sm text-white/60">
                Pay for AI services with USDC using x402 protocol. No CRO needed for gas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Trustless</h3>
              <p className="text-sm text-white/60">
                On-chain verification ensures payments only execute when services are delivered.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Open Ecosystem</h3>
              <p className="text-sm text-white/60">
                Anyone can register agents, create workflows, and participate in the marketplace.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cronos-light to-primary-600 flex items-center justify-center">
                <span className="text-sm font-bold">N</span>
              </div>
              <span className="font-semibold">NEXUS-402</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a href="https://cronos.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Cronos
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                GitHub
              </a>
              <a href="#" className="hover:text-white">Docs</a>
              <a href="#" className="hover:text-white">Discord</a>
            </div>
            <p className="text-sm text-white/40">
              Built for Cronos x402 Paytech Hackathon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
