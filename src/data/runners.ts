import type { Token } from '../types';

// BONK.fun ecosystem tokens
export const PUMP_RUNNERS: Token[] = [
  {
    id: '1',
    name: 'BONK',
    ticker: 'BONK',
    image: '/bonk.png',
    marketCap: 1800000000,
    twitter: 'bonaboree'
  },
  {
    id: '2', 
    name: 'Popcat',
    ticker: 'POPCAT',
    image: '/popcat.png',
    marketCap: 450000000,
    twitter: 'Popcat'
  },
  {
    id: '3',
    name: 'WIF',
    ticker: 'WIF',
    image: '/wif.png',
    marketCap: 620000000,
    twitter: 'dogwifcoin'
  },
  {
    id: '4',
    name: 'PNUT',
    ticker: 'PNUT',
    image: '/pnut.png',
    marketCap: 180000000,
    twitter: 'paboree_sol'
  },
  {
    id: '5',
    name: 'GOAT',
    ticker: 'GOAT',
    image: '/goat.png',
    marketCap: 280000000,
    twitter: 'goaboree'
  },
  {
    id: '6',
    name: 'MEW',
    ticker: 'MEW',
    image: '/mew.png',
    marketCap: 320000000,
    twitter: 'MewsWorld'
  },
  {
    id: '7',
    name: 'FWOG',
    ticker: 'FWOG',
    image: '/fwog.png',
    marketCap: 95000000,
    twitter: 'fwogcoin'
  },
  {
    id: '8',
    name: 'MOODENG',
    ticker: 'MOODENG',
    image: '/moodeng.png',
    marketCap: 150000000,
    twitter: 'maboree_eth'
  }
];

export const formatMarketCap = (value: number): string => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

// Normalize market cap to weight (1-100 scale for physics)
export const marketCapToWeight = (marketCap: number): number => {
  const maxCap = 2000000000; // 2B as reference max for BONK
  const minWeight = 10;
  const maxWeight = 100;
  const normalized = Math.min(marketCap / maxCap, 1);
  return minWeight + (normalized * (maxWeight - minWeight));
};
