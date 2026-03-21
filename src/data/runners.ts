import type { Token } from '../types';

// Top pump.fun runners - these would be fetched from API in production
export const PUMP_RUNNERS: Token[] = [
  {
    id: '1',
    name: 'Ansem',
    ticker: 'ANSEM',
    image: 'https://pbs.twimg.com/profile_images/1744596874907013120/X3f3OZJP_400x400.jpg',
    marketCap: 45000000,
    twitter: 'blknoiz06'
  },
  {
    id: '2', 
    name: 'Murad',
    ticker: 'MURAD',
    image: 'https://pbs.twimg.com/profile_images/1838699928618577920/KDgLqCB7_400x400.jpg',
    marketCap: 32000000,
    twitter: 'MustStopMurad'
  },
  {
    id: '3',
    name: 'Trench',
    ticker: 'TRENCH',
    image: 'https://pbs.twimg.com/profile_images/1847809057752584192/BCQPjA0L_400x400.jpg',
    marketCap: 28000000,
    twitter: 'TrenchCT'
  },
  {
    id: '4',
    name: 'Wizard',
    ticker: 'WIZ',
    image: 'https://pbs.twimg.com/profile_images/1858956851972210689/RBGXV_j9_400x400.jpg',
    marketCap: 18000000,
    twitter: 'wizardofsoho'
  },
  {
    id: '5',
    name: 'Mitch',
    ticker: 'MITCH',
    image: 'https://pbs.twimg.com/profile_images/1683318566043435009/FWLgCSjt_400x400.jpg',
    marketCap: 15000000,
    twitter: 'idrawline'
  },
  {
    id: '6',
    name: 'Dingaling',
    ticker: 'DING',
    image: 'https://pbs.twimg.com/profile_images/1584244592358064129/kC6s3d_V_400x400.jpg',
    marketCap: 12000000,
    twitter: 'daboree'
  },
  {
    id: '7',
    name: 'Hsaka',
    ticker: 'HSAKA',
    image: 'https://pbs.twimg.com/profile_images/1650920012674969601/HdqP_XmR_400x400.jpg',
    marketCap: 9500000,
    twitter: 'HsakaTrades'
  },
  {
    id: '8',
    name: 'Crash',
    ticker: 'CRASH',
    image: 'https://pbs.twimg.com/profile_images/1843068594235879424/h3BXjxFO_400x400.jpg',
    marketCap: 7200000,
    twitter: 'crash_ou812'
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
  const maxCap = 50000000; // 50M as reference max
  const minWeight = 10;
  const maxWeight = 100;
  const normalized = Math.min(marketCap / maxCap, 1);
  return minWeight + (normalized * (maxWeight - minWeight));
};
