export interface Token {
  id: string;
  name: string;
  ticker: string;
  image: string;
  marketCap: number; // in USD
  twitter?: string;
}

export interface ScaleSide {
  tokens: Token[];
  totalWeight: number;
}

export type DragItem = {
  type: 'TOKEN';
  token: Token;
  sourceArea: 'pool' | 'left' | 'right';
};
