import { Router, Request, Response } from 'express';
import { getTicker, getAllTickers, getMarketSentiment, getCROMarketData, SUPPORTED_PAIRS } from '../services/cryptoComMarketData.js';
import { nexusAgent, AgentRequest } from '../services/aiAgentSDK.js';

const router: Router = Router();

/**
 * GET /api/market - Market overview
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const tickers = await getAllTickers();
    res.json({
      success: true,
      count: tickers.length,
      data: tickers,
      source: 'Crypto.com Exchange API',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch market data', message: error.message });
  }
});

/**
 * GET /api/market/ticker/:symbol - Get ticker for specific symbol
 */
router.get('/ticker/:symbol', async (req: Request, res: Response) => {
  try {
    const ticker = await getTicker(req.params.symbol);
    if (!ticker) {
      res.status(404).json({ error: 'Symbol not found' });
      return;
    }
    res.json({
      success: true,
      data: ticker,
      source: 'Crypto.com Exchange API'
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch ticker', message: error.message });
  }
});

/**
 * GET /api/market/sentiment/:symbol - Get AI sentiment analysis
 */
router.get('/sentiment/:symbol', async (req: Request, res: Response) => {
  try {
    const sentiment = await getMarketSentiment(req.params.symbol);
    if (!sentiment) {
      res.status(404).json({ error: 'Could not analyze sentiment for symbol' });
      return;
    }
    res.json({
      success: true,
      data: sentiment,
      poweredBy: 'NEXUS-402 AI Agent'
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to analyze sentiment', message: error.message });
  }
});

/**
 * GET /api/market/cro - Cronos ecosystem market data
 */
router.get('/cro', async (req: Request, res: Response) => {
  try {
    const data = await getCROMarketData();
    res.json({
      success: true,
      data,
      ecosystem: 'Cronos',
      source: 'Crypto.com Exchange API'
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch CRO data', message: error.message });
  }
});

/**
 * GET /api/market/pairs - List supported trading pairs
 */
router.get('/pairs', (req: Request, res: Response) => {
  res.json({
    success: true,
    pairs: SUPPORTED_PAIRS,
    source: 'Crypto.com Exchange'
  });
});

/**
 * POST /api/market/agent - Execute AI agent action
 */
router.post('/agent', async (req: Request, res: Response) => {
  try {
    const request: AgentRequest = {
      action: req.body.action,
      params: req.body.params || {},
      agentId: req.body.agentId,
      walletAddress: req.body.walletAddress
    };

    const response = await nexusAgent.processRequest(request);
    
    res.json({
      success: response.success,
      response,
      x402: {
        required: true,
        amount: '0.10 USDC',
        protocol: 'x402',
        network: 'Cronos Testnet'
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Agent execution failed', message: error.message });
  }
});

/**
 * GET /api/market/agent/actions - List available agent actions
 */
router.get('/agent/actions', (req: Request, res: Response) => {
  res.json({
    success: true,
    actions: [
      {
        name: 'get_price',
        description: 'Get real-time price for a trading pair',
        params: { symbol: 'string (e.g., CRO_USD)' },
        cost: '0.01 USDC'
      },
      {
        name: 'analyze_market',
        description: 'Analyze market conditions for multiple assets',
        params: { symbols: 'string[] (optional)' },
        cost: '0.05 USDC'
      },
      {
        name: 'sentiment_analysis',
        description: 'AI-powered sentiment analysis for a trading pair',
        params: { symbol: 'string' },
        cost: '0.10 USDC'
      },
      {
        name: 'portfolio_recommendation',
        description: 'Get portfolio allocation recommendations',
        params: { riskTolerance: 'low|medium|high', investment: 'number' },
        cost: '0.25 USDC'
      },
      {
        name: 'defi_opportunity',
        description: 'Find best DeFi opportunities on Cronos',
        params: {},
        cost: '0.15 USDC'
      },
      {
        name: 'execute_trade',
        description: 'Prepare trade execution via x402',
        params: { fromToken: 'string', toToken: 'string', amount: 'number' },
        cost: '0.10 USDC + execution fee'
      }
    ],
    poweredBy: 'NEXUS-402 AI Agent SDK'
  });
});

export { router as marketRoutes };
