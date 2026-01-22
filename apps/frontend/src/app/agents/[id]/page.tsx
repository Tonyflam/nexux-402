'use client';

import { Header } from '@/components/Header';
import { Bot, ExternalLink, ArrowLeft, Copy, CheckCircle, DollarSign, Activity, Star, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAgents } from '@/lib/hooks';
import { CRONOS_EXPLORER } from '@/lib/contracts';

// Real transaction hashes for our registered agents
const AGENT_TX_HASHES: Record<string, string> = {
  '0x01bd5541c65a95e0a698678db9dfb6797a581aeeae410d80bf5155e17ca261ec': '0x2e2f087eaf9ac349c68971cc096590228bb85c3f96ce006299c7904bacd14ea1',
  '0x835b24a343bdc43e104ad57f2daf70d5af46389b284e4b4fb9fd7e6cf2db542c': '0x828e3af06b662b77770fc2be6c48b4b6b2bfb47db0694518999b7f340a506b08',
  '0x8df98f2718a4ce51ce2bc7dd6fabd0d66354c94dd2a60e2cc81c5820a419e610': '0x3913db22d1d3983325072028765420e47ad8e1b7a14c0881224db0fb321524c3',
  '0xcd33b4af32e89469ac8e8296f576d149da4b3eecff8dc23a5af8c07734c3be1a': '0x856e040fd8ba032071feb8b6c39c47505b431b9b5f33cf6da2f1bc83f605bb70',
};

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.id as string;
  const { agents, loading } = useAgents();
  const [copied, setCopied] = useState(false);
  
  // Find the agent from our list
  const agent = agents.find(a => a.id === agentId);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get the registration TX hash for this agent
  const txHash = AGENT_TX_HASHES[agentId] || null;

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cronos"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/agents" className="flex items-center gap-2 text-cronos-light hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Link>
          <div className="card text-center py-12">
            <Bot className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Agent Not Found</h2>
            <p className="text-white/60 mb-4">
              The agent with ID <code className="text-xs bg-white/10 px-2 py-1 rounded">{agentId.slice(0, 10)}...</code> was not found.
            </p>
            <Link href="/agents" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse All Agents
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link href="/agents" className="flex items-center gap-2 text-cronos-light hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Agents
        </Link>

        {/* Agent Header */}
        <div className="card mb-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cronos/30 to-purple-500/30 flex items-center justify-center text-4xl">
              {agent.name.includes('Price') ? '🔮' : 
               agent.name.includes('Sentiment') ? '📊' :
               agent.name.includes('Yield') ? '💰' :
               agent.name.includes('Auditor') ? '🔐' : '🤖'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{agent.name}</h1>
                {agent.isActive && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Active
                  </span>
                )}
              </div>
              <p className="text-white/70 mb-4">{agent.description || 'AI agent registered on NEXUS-402 protocol'}</p>
              
              {/* Capabilities */}
              <div className="flex flex-wrap gap-2">
                {agent.capabilities?.map((cap: string) => (
                  <span key={cap} className="px-3 py-1 bg-cronos/20 text-cronos-light rounded-full text-sm">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card bg-gradient-to-br from-green-900/20 to-green-900/5">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Price per Call</span>
            </div>
            <p className="text-2xl font-bold">${(agent.pricePerCall / 1_000_000).toFixed(2)}</p>
            <p className="text-xs text-white/50">USDC</p>
          </div>
          
          <div className="card bg-gradient-to-br from-purple-900/20 to-purple-900/5">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Total Calls</span>
            </div>
            <p className="text-2xl font-bold">{agent.totalCalls.toLocaleString()}</p>
            <p className="text-xs text-white/50">executions</p>
          </div>
          
          <div className="card bg-gradient-to-br from-yellow-900/20 to-yellow-900/5">
            <div className="flex items-center gap-2 text-yellow-400 mb-2">
              <Star className="w-4 h-4" />
              <span className="text-sm">Rating</span>
            </div>
            <p className="text-2xl font-bold">{agent.rating.toFixed(1)}</p>
            <p className="text-xs text-white/50">out of 5.0</p>
          </div>
          
          <div className="card bg-gradient-to-br from-blue-900/20 to-blue-900/5">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Revenue</span>
            </div>
            <p className="text-2xl font-bold">${(agent.totalRevenue / 1_000_000).toFixed(2)}</p>
            <p className="text-xs text-white/50">earned</p>
          </div>
        </div>

        {/* On-Chain Details */}
        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cronos" />
            On-Chain Details
          </h2>
          
          <div className="space-y-4">
            {/* Agent ID */}
            <div>
              <label className="text-sm text-white/50 block mb-1">Agent ID (On-Chain)</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-black/30 px-4 py-2 rounded-lg text-sm font-mono text-cronos-light overflow-x-auto">
                  {agentId}
                </code>
                <button 
                  onClick={() => copyToClipboard(agentId)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/50" />}
                </button>
              </div>
            </div>

            {/* Payment Address */}
            <div>
              <label className="text-sm text-white/50 block mb-1">Payment Address</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-black/30 px-4 py-2 rounded-lg text-sm font-mono text-white/70 overflow-x-auto">
                  {agent.paymentAddress || agent.owner}
                </code>
                <a 
                  href={`${CRONOS_EXPLORER}/address/${agent.paymentAddress || agent.owner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cronos-light" />
                </a>
              </div>
            </div>

            {/* Registration TX */}
            {txHash && (
              <div>
                <label className="text-sm text-white/50 block mb-1">Registration Transaction</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-black/30 px-4 py-2 rounded-lg text-sm font-mono text-green-400 overflow-x-auto">
                    {txHash}
                  </code>
                  <a 
                    href={`${CRONOS_EXPLORER}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-green-400" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Link href="/x402-demo" className="btn-primary flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Pay & Execute Agent
          </Link>
          <a 
            href={`${CRONOS_EXPLORER}/address/${agent.paymentAddress || agent.owner}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View on Explorer
          </a>
        </div>
      </main>
    </div>
  );
}
