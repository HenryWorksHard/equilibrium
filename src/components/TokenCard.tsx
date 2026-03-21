import type { Token } from '../types';
import { formatMarketCap, marketCapToWeight } from '../data/runners';

interface TokenCardProps {
  token: Token;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, token: Token, source: string) => void;
  source: 'pool' | 'left' | 'right';
  compact?: boolean;
}

export const TokenCard = ({ 
  token, 
  isDragging, 
  onDragStart, 
  source,
  compact = false 
}: TokenCardProps) => {
  const weight = marketCapToWeight(token.marketCap);
  
  // Size based on market cap weight
  const size = compact ? 48 + (weight / 100) * 24 : 64 + (weight / 100) * 32;
  
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, token, source)}
      className={`
        relative cursor-grab active:cursor-grabbing
        token-glow smooth-transition select-none
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
      `}
      style={{ width: size, height: size }}
    >
      {/* Profile image */}
      <img
        src={token.image}
        alt={token.name}
        className="w-full h-full rounded-full object-cover border-2 border-chalk/20"
        draggable={false}
      />
      
      {/* Market cap label */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 
        bg-slate/90 px-1.5 py-0.5 rounded text-[10px] font-mono
        whitespace-nowrap border border-chalk/10">
        {formatMarketCap(token.marketCap)}
      </div>
      
      {/* Ticker on hover */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 
        opacity-0 hover:opacity-100 transition-opacity
        bg-accent/90 px-2 py-0.5 rounded text-[10px] font-mono uppercase
        whitespace-nowrap">
        {token.ticker}
      </div>
    </div>
  );
};
