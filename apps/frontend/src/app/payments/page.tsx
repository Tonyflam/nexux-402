'use client';

import { Header } from '@/components/Header';
import { StatCard } from '@/components/Cards';
import { CreditCard, DollarSign, ArrowUpRight, Clock, ExternalLink, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useProtocolStats, useWallet } from '@/lib/hooks';
import { CONTRACTS, CRONOS_TESTNET } from '@/lib/contracts';

export default function PaymentsPage() {
  const stats = useProtocolStats();
  const { address, isConnected, connect } = useWallet();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">x402 Payments</h1>
            <p className="text-white/60">Gasless USDC payments on Cronos</p>
          </div>
          <Link 
            href="/x402-demo" 
            className="btn-primary flex items-center gap-2 w-fit"
          >
            <CreditCard className="w-4 h-4" /> Try x402 Demo
          </Link>
        </div>

        {/* Live Stats from Blockchain */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Volume"
            value={`$${stats.totalVolume}`}
            icon={<DollarSign className="w-6 h-6 text-green-400" />}
          />
          <StatCard
            title="Total Calls"
            value={stats.totalCalls.toString()}
            icon={<ArrowUpRight className="w-6 h-6 text-purple-400" />}
          />
          <StatCard
            title="Active Agents"
            value={stats.totalAgents.toString()}
            icon={<CreditCard className="w-6 h-6 text-cronos-light" />}
          />
          <StatCard
            title="Block"
            value={`#${stats.blockNumber.toLocaleString()}`}
            icon={<Clock className="w-6 h-6 text-yellow-400" />}
          />
        </div>

        {/* Deployed Contract */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Payment Router Contract</h2>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-sm text-white/60">PaymentRouter.sol</p>
              <code className="text-cronos-light text-sm font-mono">
                {CONTRACTS.PAYMENT_ROUTER}
              </code>
            </div>
            <a 
              href={`${CRONOS_TESTNET.blockExplorer}/address/${CONTRACTS.PAYMENT_ROUTER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cronos-light hover:underline"
            >
              View on Explorer <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Payment Types */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Supported Payment Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-cronos-light/20 to-primary-600/20 border border-cronos-light/30">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold">x402 Simple</p>
                  <p className="text-sm text-white/60">Gasless one-time payment</p>
                </div>
              </div>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Live</span>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌊</span>
                <div>
                  <p className="font-semibold">Streaming</p>
                  <p className="text-sm text-white/60">Pay over time</p>
                </div>
              </div>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Contract Ready</span>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔀</span>
                <div>
                  <p className="font-semibold">Split</p>
                  <p className="text-sm text-white/60">Multi-recipient</p>
                </div>
              </div>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Contract Ready</span>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="font-semibold">Recurring</p>
                  <p className="text-sm text-white/60">Scheduled payments</p>
                </div>
              </div>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Contract Ready</span>
            </div>
          </div>
        </div>

        {/* x402 Demo CTA */}
        <div className="glass rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cronos-light/20 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-cronos-light" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Try x402 Payments</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Experience gasless USDC payments powered by EIP-3009 authorization.
            No gas fees for the payer!
          </p>
          
          {!isConnected ? (
            <button onClick={connect} className="btn-primary inline-flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Connect Wallet to Start
            </button>
          ) : (
            <Link href="/x402-demo" className="btn-primary inline-flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Go to x402 Demo
            </Link>
          )}
        </div>

        {/* USDC Info */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-white/60 text-center">
            Using USDC.e on Cronos Testnet: <code className="text-cronos-light">{CONTRACTS.USDC}</code>
          </p>
        </div>
      </main>
    </div>
  );
}
