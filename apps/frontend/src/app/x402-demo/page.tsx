'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { 
  Zap, 
  DollarSign, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Bot,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { useWallet, useAgents } from '@/lib/hooks';
import { CONTRACTS, CRONOS_EXPLORER, getProvider } from '@/lib/contracts';
import { ethers } from 'ethers';

// x402 Payment Demo Steps
type DemoStep = 'connect' | 'select' | 'approve' | 'pay' | 'complete';

// Real on-chain agent IDs (from registration)
const REGISTERED_AGENT_IDS = [
  '0x01bd5541c65a95e0a698678db9dfb6797a581aeeae410d80bf5155e17ca261ec',
  '0x835b24a343bdc43e104ad57f2daf70d5af46389b284e4b4fb9fd7e6cf2db542c',
  '0x8df98f2718a4ce51ce2bc7dd6fabd0d66354c94dd2a60e2cc81c5820a419e610',
  '0xcd33b4af32e89469ac8e8296f576d149da4b3eecff8dc23a5af8c07734c3be1a',
];

function X402DemoPage() {
  const { address, isConnected } = useWallet();
  const { agents: onChainAgents, loading: agentsLoading } = useAgents();
  const [step, setStep] = useState<DemoStep>('connect');
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Update step when connected
  useEffect(() => {
    if (isConnected && step === 'connect') {
      setStep('select');
    }
  }, [isConnected, step]);

  const handleSelectAgent = (agent: any) => {
    setSelectedAgent(agent);
    setStep('approve');
  };

  // Get agents to display - prefer on-chain, fallback to demo
  const displayAgents = onChainAgents.length > 0 ? onChainAgents : [
    { id: '1', name: 'DeFi Price Oracle', description: 'Get real-time token prices', pricePerCall: 0.10, capabilities: ['defi'], isActive: true, totalCalls: 0, rating: 4.5, owner: '', paymentAddress: '', endpoint: '', price: '0.10', totalRevenue: 0 },
    { id: '2', name: 'Sentiment Analyzer', description: 'Analyze social sentiment', pricePerCall: 0.25, capabilities: ['analytics'], isActive: true, totalCalls: 0, rating: 4.8, owner: '', paymentAddress: '', endpoint: '', price: '0.25', totalRevenue: 0 },
    { id: '3', name: 'Yield Optimizer', description: 'Find best yield opportunities', pricePerCall: 0.50, capabilities: ['automation'], isActive: true, totalCalls: 0, rating: 4.7, owner: '', paymentAddress: '', endpoint: '', price: '0.50', totalRevenue: 0 },
  ];

  const handleApprove = async () => {
    setLoading(true);
    try {
      // In production, this would approve USDC spending
      // For demo, we simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('pay');
    } catch (error) {
      console.error('Approval failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    if (!selectedAgent) return;
    
    setLoading(true);
    try {
      // Simulate x402 payment flow
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Generate a realistic transaction hash
      const fakeTxHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setTxHash(fakeTxHash);
      
      // Generate response based on agent capabilities
      const capabilities = selectedAgent.capabilities || [];
      let agentResponse: any = {};
      
      if (capabilities.includes('defi') || selectedAgent.name.toLowerCase().includes('defi')) {
        agentResponse = {
          prices: { CRO: '$0.0894', ETH: '$3,412.56', BTC: '$68,234.12' },
          bestYield: { protocol: 'VVS Finance', apy: '14.2%', pair: 'CRO-USDC' },
          recommendation: 'ACCUMULATE',
          confidence: '87%'
        };
      } else if (capabilities.includes('analytics') || selectedAgent.name.toLowerCase().includes('sentiment')) {
        agentResponse = {
          sentiment: 'Bullish',
          score: 78,
          socialVolume: '+23% (24h)',
          trending: true,
          sources: ['Twitter', 'Discord', 'Telegram']
        };
      } else if (capabilities.includes('automation') || selectedAgent.name.toLowerCase().includes('yield')) {
        agentResponse = {
          opportunities: [
            { protocol: 'VVS Finance', apy: '12.5%', risk: 'Medium' },
            { protocol: 'Tectonic', apy: '8.2%', risk: 'Low' },
            { protocol: 'Ferro Protocol', apy: '5.8%', risk: 'Low' }
          ],
          recommendation: 'VVS Finance CRO-USDC LP'
        };
      } else if (capabilities.includes('security') || selectedAgent.name.toLowerCase().includes('auditor')) {
        agentResponse = {
          verdict: 'SAFE',
          riskScore: 12,
          checks: [
            { name: 'Reentrancy', status: 'PASS' },
            { name: 'Integer Overflow', status: 'PASS' },
            { name: 'Access Control', status: 'PASS' }
          ],
          gasOptimization: 'Good'
        };
      } else {
        agentResponse = {
          status: 'success',
          message: 'Agent executed successfully',
          data: { processed: true }
        };
      }
      
      setResult({
        success: true,
        agentName: selectedAgent.name,
        response: agentResponse,
        timestamp: new Date().toISOString(),
      });
      
      setStep('complete');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyTxHash = () => {
    if (txHash) {
      navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetDemo = () => {
    setStep(isConnected ? 'select' : 'connect');
    setSelectedAgent(null);
    setTxHash(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cronos-light to-primary-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            x402 Payment <span className="gradient-text">Demo</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience the x402 payment protocol in action. Pay for AI agent services 
            with USDC on Cronos - gasless, instant, and secure.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 max-w-xl mx-auto">
          {['Connect', 'Select Agent', 'Approve', 'Pay', 'Complete'].map((label, i) => {
            const stepIndex = ['connect', 'select', 'approve', 'pay', 'complete'].indexOf(step);
            const isActive = i === stepIndex;
            const isComplete = i < stepIndex;
            
            return (
              <div key={label} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${isComplete ? 'bg-green-500' : isActive ? 'bg-cronos-light' : 'bg-white/10'}
                  transition-colors
                `}>
                  {isComplete ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs mt-2 ${isActive ? 'text-cronos-light' : 'text-white/60'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="glass rounded-2xl p-8">
          {/* Step 1: Connect Wallet */}
          {step === 'connect' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-cronos-light/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-cronos-light" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Connect your wallet using the button in the top right corner to start using x402 payments.
              </p>
              <p className="text-sm text-cronos-light">
                👆 Click "Connect Wallet" in the header above
              </p>
            </div>
          )}

          {/* Step 2: Select Agent */}
          {step === 'select' && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-center">Select an AI Agent</h2>
              <p className="text-white/60 mb-2 text-center">
                Choose an agent to call. You'll pay with USDC via x402.
              </p>
              {onChainAgents.length > 0 && (
                <p className="text-xs text-green-400 text-center mb-8">
                  ✓ {onChainAgents.length} agents loaded from on-chain registry
                </p>
              )}
              {agentsLoading && (
                <div className="flex items-center justify-center gap-2 mb-8">
                  <Loader2 className="w-4 h-4 animate-spin text-cronos-light" />
                  <span className="text-sm text-white/60">Loading from NexusRegistry...</span>
                </div>
              )}
              <div className="grid gap-4">
                {displayAgents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => handleSelectAgent(agent)}
                    className="flex items-center justify-between p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cronos-light/50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cronos-light/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-cronos-light" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-cronos-light transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-white/60">{agent.description}</p>
                        {agent.capabilities && (
                          <div className="flex gap-1 mt-1">
                            {agent.capabilities.slice(0, 3).map((cap: string) => (
                              <span key={cap} className="text-xs px-2 py-0.5 rounded bg-cronos-light/10 text-cronos-light">
                                {cap}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">${agent.pricePerCall || agent.price}</div>
                      <div className="text-xs text-white/40">USDC per call</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Approve USDC */}
          {step === 'approve' && selectedAgent && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Approve USDC Spending</h2>
              <p className="text-white/60 mb-4 max-w-md mx-auto">
                Allow the PaymentRouter contract to spend USDC on your behalf for this payment.
              </p>
              
              <div className="glass rounded-xl p-6 mb-8 max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60">Agent:</span>
                  <span className="font-semibold">{selectedAgent.name}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60">Amount:</span>
                  <span className="font-bold text-green-400 text-xl">${selectedAgent.pricePerCall} USDC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Contract:</span>
                  <a 
                    href={`${CRONOS_EXPLORER}/address/${CONTRACTS.PAYMENT_ROUTER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cronos-light hover:underline text-sm flex items-center gap-1"
                  >
                    PaymentRouter <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <button 
                onClick={handleApprove}
                disabled={loading}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>Approve USDC <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}

          {/* Step 4: Make Payment */}
          {step === 'pay' && selectedAgent && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Execute x402 Payment</h2>
              <p className="text-white/60 mb-4 max-w-md mx-auto">
                Pay for the agent call using the x402 protocol. The payment will be processed 
                atomically with the agent execution.
              </p>
              
              <div className="glass rounded-xl p-6 mb-8 max-w-sm mx-auto text-left">
                <h4 className="font-semibold mb-3">Payment Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">From:</span>
                    <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">To:</span>
                    <span>{selectedAgent.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Amount:</span>
                    <span className="text-green-400 font-bold">${selectedAgent.pricePerCall} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Gas:</span>
                    <span className="text-cronos-light">Sponsored (0 CRO)</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handlePay}
                disabled={loading}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing x402 Payment...
                  </>
                ) : (
                  <>Pay & Execute <Zap className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}

          {/* Step 5: Complete */}
          {step === 'complete' && selectedAgent && result && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-400">Payment Successful!</h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Your x402 payment was processed and the agent has returned a response.
              </p>

              {/* Transaction Hash */}
              {txHash && (
                <div className="glass rounded-xl p-4 mb-6 max-w-md mx-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Transaction:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-cronos-light">
                        {txHash.slice(0, 10)}...{txHash.slice(-8)}
                      </code>
                      <button onClick={copyTxHash} className="text-white/60 hover:text-white">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <a 
                        href={`${CRONOS_EXPLORER}/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-cronos-light"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Agent Response */}
              <div className="glass rounded-xl p-6 mb-8 max-w-md mx-auto text-left">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-cronos-light" />
                  {result.agentName} Response
                </h4>
                <pre className="bg-black/30 rounded-lg p-4 text-sm overflow-x-auto">
                  {JSON.stringify(result.response, null, 2)}
                </pre>
                <div className="mt-4 text-xs text-white/40">
                  Timestamp: {new Date(result.timestamp).toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={resetDemo}
                  className="btn-secondary"
                >
                  Try Another Agent
                </button>
                <a 
                  href={`${CRONOS_EXPLORER}/address/${CONTRACTS.PAYMENT_ROUTER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  View Contract <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Protocol Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Pay with USDC</h3>
            <p className="text-sm text-white/60">
              Use stablecoins for predictable, transparent pricing
            </p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-cronos-light/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-cronos-light" />
            </div>
            <h3 className="font-semibold mb-2">Gasless Transactions</h3>
            <p className="text-sm text-white/60">
              No CRO needed - gas is sponsored by the protocol
            </p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Atomic Execution</h3>
            <p className="text-sm text-white/60">
              Payment only releases when service is delivered
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default X402DemoPage;
