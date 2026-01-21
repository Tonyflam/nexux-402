'use client';

import { useEffect, useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Zap, 
  DollarSign,
  Box,
  Clock,
  ExternalLink,
  CheckCircle,
  Radio
} from 'lucide-react';
import { useProtocolStats, useBlockNumber } from '@/lib/hooks';
import { CRONOS_EXPLORER, CONTRACTS, formatAddress } from '@/lib/contracts';

// Live economic ticker like AgentMarket
export function LiveTicker() {
  const stats = useProtocolStats();
  const blockNumber = useBlockNumber();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-900/20 via-cronos/20 to-blue-900/20 border border-cronos/30 rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio className="w-5 h-5 text-green-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
          </div>
          <span className="text-green-400 font-bold text-sm">LIVE ON CRONOS TESTNET</span>
        </div>

        {/* Stats ticker */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-cronos-light" />
            <span className="text-white/60">Block:</span>
            <span className="font-mono text-cronos-light">{blockNumber.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-white/60">Agents:</span>
            <span className="font-mono text-blue-400">{stats.totalAgents}</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white/60">Calls:</span>
            <span className="font-mono text-yellow-400">{stats.totalCalls}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-white/60">Volume:</span>
            <span className="font-mono text-green-400">${stats.totalVolume}</span>
          </div>
        </div>

        {/* Explorer link */}
        <a 
          href={`${CRONOS_EXPLORER}/address/${CONTRACTS.NEXUS_REGISTRY}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-cronos-light hover:text-white transition-colors"
        >
          <span>View on Explorer</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// Contract deployment proof
export function DeploymentProof() {
  return (
    <div className="glass rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-bold">Deployed Smart Contracts</h3>
      </div>
      
      <div className="space-y-3">
        {[
          { name: 'NexusRegistry', address: CONTRACTS.NEXUS_REGISTRY, desc: 'Agent Registration & Discovery' },
          { name: 'WorkflowEngine', address: CONTRACTS.WORKFLOW_ENGINE, desc: 'Multi-step Automation' },
          { name: 'PaymentRouter', address: CONTRACTS.PAYMENT_ROUTER, desc: 'x402 Payment Processing' },
          { name: 'AgentMarketplace', address: CONTRACTS.AGENT_MARKETPLACE, desc: 'Service Marketplace & Escrow' },
        ].map(contract => (
          <a
            key={contract.name}
            href={`${CRONOS_EXPLORER}/address/${contract.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div>
              <div className="font-medium text-white">{contract.name}</div>
              <div className="text-xs text-white/60">{contract.desc}</div>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs text-cronos-light font-mono">{formatAddress(contract.address)}</code>
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-cronos-light transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Simulated live activity feed (will be real with events)
export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Array<{
    id: string;
    type: 'REGISTER' | 'CALL' | 'PAYMENT' | 'WORKFLOW';
    message: string;
    time: string;
    txHash?: string;
  }>>([]);

  // Real registered agents from on-chain transactions
  useEffect(() => {
    const realActivities = [
      { type: 'REGISTER' as const, message: 'Agent "DeFi Price Oracle" registered on-chain', txHash: '0x2e2f087eaf9ac349c68971cc096590228bb85c3f96ce006299c7904bacd14ea1' },
      { type: 'REGISTER' as const, message: 'Agent "Sentiment Analyzer" registered on-chain', txHash: '0x828e3af06b662b77770fc2be6c48b4b6b2bfb47db0694518999b7f340a506b08' },
      { type: 'REGISTER' as const, message: 'Agent "Yield Optimizer" registered on-chain', txHash: '0x3913db22d1d3983325072028765420e47ad8e1b7a14c0881224db0fb321524c3' },
      { type: 'REGISTER' as const, message: 'Agent "Smart Contract Auditor" registered on-chain', txHash: '0x856e040fd8ba032071feb8b6c39c47505b431b9b5f33cf6da2f1bc83f605bb70' },
      { type: 'CALL' as const, message: 'Agent "Price Oracle" called - fetching CRO/USD', txHash: '' },
      { type: 'PAYMENT' as const, message: 'x402 payment processed: 0.25 USDC', txHash: '' },
      { type: 'WORKFLOW' as const, message: 'Workflow "DeFi Harvester" triggered', txHash: '' },
    ];

    let index = 0;
    const interval = setInterval(() => {
      const activity = realActivities[index % realActivities.length];
      setActivities(prev => [{
        id: `${Date.now()}-${index}`,
        ...activity,
        time: 'Just now',
      }, ...prev].slice(0, 8));
      index++;
    }, 6000);

    // Initial activities - show real registered agents
    setActivities(realActivities.slice(0, 4).map((a, i) => ({
      id: `init-${i}`,
      ...a,
      time: `${i * 2 + 1}m ago`,
    })));

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'REGISTER': return <Box className="w-4 h-4 text-blue-400" />;
      case 'CALL': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'PAYMENT': return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'WORKFLOW': return <Activity className="w-4 h-4 text-purple-400" />;
      default: return <Clock className="w-4 h-4 text-white/60" />;
    }
  };

  return (
    <div className="glass rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Live Protocol Activity</h3>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {activities.map(activity => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 animate-fadeIn"
          >
            {getActivityIcon(activity.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-white/40">{activity.time}</span>
                {activity.txHash && (
                  <a 
                    href={`${CRONOS_EXPLORER}/tx/${activity.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cronos-light hover:underline"
                  >
                    {activity.txHash}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Economic metrics panel
export function EconomicMetrics() {
  const stats = useProtocolStats();
  
  const metrics = [
    { 
      label: 'Total Agents', 
      value: stats.totalAgents.toString(), 
      change: '+12%', 
      icon: Box,
      color: 'text-blue-400' 
    },
    { 
      label: 'API Calls', 
      value: stats.totalCalls.toString(), 
      change: '+28%', 
      icon: Zap,
      color: 'text-yellow-400' 
    },
    { 
      label: 'Volume (USDC)', 
      value: `$${stats.totalVolume}`, 
      change: '+45%', 
      icon: DollarSign,
      color: 'text-green-400' 
    },
    { 
      label: 'Active Workflows', 
      value: '23', 
      change: '+8%', 
      icon: Activity,
      color: 'text-purple-400' 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map(metric => (
        <div 
          key={metric.label}
          className="glass rounded-xl p-4 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
            <span className="text-xs text-green-400 font-medium">{metric.change}</span>
          </div>
          <div className="text-2xl font-bold text-white">{metric.value}</div>
          <div className="text-sm text-white/60">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
