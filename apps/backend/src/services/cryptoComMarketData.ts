/**
 * Crypto.com Market Data Integration
 * 
 * This service integrates with Crypto.com's public Exchange API
 * to provide real-time market data for AI agents.
 * 
 * @see https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html
 */

import axios from 'axios';

// Crypto.com Exchange API base URL (v2 for public endpoints)
const CRYPTO_COM_API = 'https://api.crypto.com/v2';

// Supported trading pairs on Crypto.com
export const SUPPORTED_PAIRS = [
  'CRO_USDT', 'BTC_USDT', 'ETH_USDT', 'USDC_USDT',
  'SOL_USDT', 'ATOM_USDT', 'AVAX_USDT', 'MATIC_USDT', 
  'LINK_USDT', 'DOGE_USDT', 'SHIB_USDT', 'CRO_BTC'
];

export interface TickerData {
  symbol: string;
  price: string;
  priceChange24h: string;
  priceChangePercent24h: string;
  high24h: string;
  low24h: string;
  volume24h: string;
  timestamp: number;
}

export interface CandlestickData {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface MarketSentiment {
  symbol: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  score: number; // -100 to 100
  indicators: {
    priceChange: number;
    volumeTrend: string;
    momentum: string;
  };
}

/**
 * Get real-time ticker data for a trading pair
 */
export async function getTicker(symbol: string): Promise<TickerData | null> {
  try {
    const response = await axios.get(`${CRYPTO_COM_API}/public/get-ticker`, {
      params: { instrument_name: symbol }
    });

    if (response.data?.result?.data?.[0]) {
      const data = response.data.result.data[0];
      // Calculate percent change from price change
      const priceChange = parseFloat(data.c || '0');
      const currentPrice = parseFloat(data.a || '0');
      const priceChangePercent = currentPrice > 0 ? ((priceChange / (currentPrice - priceChange)) * 100).toFixed(2) : '0';
      
      return {
        symbol: data.i,
        price: data.a,
        priceChange24h: data.c || '0',
        priceChangePercent24h: priceChangePercent,
        high24h: data.h,
        low24h: data.l,
        volume24h: data.v,
        timestamp: data.t
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ticker for ${symbol}:`, error);
    return null;
  }
}

/**
 * Get tickers for all supported pairs
 */
export async function getAllTickers(): Promise<TickerData[]> {
  try {
    const response = await axios.get(`${CRYPTO_COM_API}/public/get-ticker`);
    
    if (response.data?.result?.data) {
      return response.data.result.data
        .filter((t: any) => SUPPORTED_PAIRS.includes(t.i))
        .map((data: any) => ({
          symbol: data.i,
          price: data.a,
          priceChange24h: data.c || '0',
          priceChangePercent24h: data.P || '0',
          high24h: data.h,
          low24h: data.l,
          volume24h: data.v,
          timestamp: data.t
        }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching all tickers:', error);
    return [];
  }
}

/**
 * Get candlestick/kline data
 */
export async function getCandlesticks(
  symbol: string, 
  interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1D' = '1h',
  limit: number = 24
): Promise<CandlestickData[]> {
  try {
    const response = await axios.get(`${CRYPTO_COM_API}/public/get-candlestick`, {
      params: { 
        instrument_name: symbol,
        timeframe: interval,
        count: limit
      }
    });

    if (response.data?.result?.data) {
      return response.data.result.data.map((candle: any) => ({
        timestamp: candle.t,
        open: candle.o,
        high: candle.h,
        low: candle.l,
        close: candle.c,
        volume: candle.v
      }));
    }
    return [];
  } catch (error) {
    console.error(`Error fetching candlesticks for ${symbol}:`, error);
    return [];
  }
}

/**
 * Calculate market sentiment based on price action
 */
export async function getMarketSentiment(symbol: string): Promise<MarketSentiment | null> {
  try {
    const [ticker, candles] = await Promise.all([
      getTicker(symbol),
      getCandlesticks(symbol, '1h', 24)
    ]);

    if (!ticker || candles.length === 0) return null;

    const priceChange = parseFloat(ticker.priceChangePercent24h);
    
    // Calculate momentum from candles
    const recentCandles = candles.slice(-6);
    const upCandles = recentCandles.filter(c => parseFloat(c.close) > parseFloat(c.open)).length;
    const momentum = upCandles >= 4 ? 'strong' : upCandles >= 3 ? 'moderate' : 'weak';
    
    // Calculate volume trend
    const avgVolume = candles.reduce((sum, c) => sum + parseFloat(c.volume), 0) / candles.length;
    const recentVolume = recentCandles.reduce((sum, c) => sum + parseFloat(c.volume), 0) / recentCandles.length;
    const volumeTrend = recentVolume > avgVolume * 1.2 ? 'increasing' : recentVolume < avgVolume * 0.8 ? 'decreasing' : 'stable';

    // Calculate sentiment score
    let score = priceChange * 5; // Base score from price change
    if (momentum === 'strong') score += 20;
    if (volumeTrend === 'increasing') score += 10;
    score = Math.max(-100, Math.min(100, score));

    const sentiment = score > 15 ? 'bullish' : score < -15 ? 'bearish' : 'neutral';

    return {
      symbol,
      sentiment,
      score: Math.round(score),
      indicators: {
        priceChange,
        volumeTrend,
        momentum
      }
    };
  } catch (error) {
    console.error(`Error calculating sentiment for ${symbol}:`, error);
    return null;
  }
}

/**
 * Get CRO-specific market data (for Cronos ecosystem)
 */
export async function getCROMarketData() {
  const [croTicker, sentiment] = await Promise.all([
    getTicker('CRO_USDT'),
    getMarketSentiment('CRO_USDT')
  ]);

  return {
    ticker: croTicker,
    sentiment,
    ecosystem: 'Cronos',
    network: {
      name: 'Cronos Testnet',
      chainId: 338,
      rpc: 'https://evm-t3.cronos.org'
    }
  };
}
