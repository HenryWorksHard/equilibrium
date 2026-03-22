import { useState } from 'react';
import type { Token } from '../types';
import { formatMarketCap, marketCapToWeight } from '../data/runners';

interface TokenCardProps {
  token: Token;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, token: Token, source: string) => void;
  source: 'pool' | 'left' | 'right';
  compact?: boolean;
}

// Generate a gradient based on ticker for fallback
const getGradient = (ticker: string) => {
  const gradients: Record<string, string> = {
    BONK: 'from-orange-400 to-yellow-500',
    POPCAT: 'from-pink-400 to-purple-500',
    WIF: 'from-amber-400 to-orange-500',
    PNUT: 'from-amber-600 to-yellow-600',
    GOAT: 'from-gray-400 to-slate-600',
    MEW: 'from-blue-400 to-cyan-500',
    FWOG: 'from-green-400 to-emerald-500',
    MOODENG: 'from-pink-500 to-rose-400',
  };
  return gradients[ticker] || 'from-slate-400 to-slate-600';
};

export const TokenCard = ({ 
  token, 
  isDragging, 
  onDragStart, 
  source,
  compact = false 
}: TokenCardProps) => {
  const [imgError, setImgError] = useState(false);
  const weight = marketCapToWeight(token.marketCap);
  
  // Size based on market cap weight - smaller for buckets
  const size = compact ? 28 + (weight / 100) * 12 : 56 + (weight / 100) * 24;
  
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, token, source)}
      className={`
        relative cursor-grab active:cursor-grabbing
        token-circle select-none
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
      `}
      style={{ width: size, height: size }}
    >
      {/* Profile image or fallback gradient */}
      {imgError ? (
        <div 
          className={`w-full h-full rounded-full bg-gradient-to-br ${getGradient(token.ticker)}
            border-2 border-graphBlue/30 shadow-md flex items-center justify-center`}
        >
          <span className="text-white font-bold text-xs">{token.ticker.slice(0, 2)}</span>
        </div>
      ) : (
        <img
          src={token.image}
          alt={token.name}
          className="w-full h-full rounded-full object-cover 
            border-2 border-graphBlue/30 bg-cream shadow-md"
          draggable={false}
          onError={() => setImgError(true)}
        />
      )}
      
      {/* Market cap label */}
      {!compact && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 
          bg-paper/95 px-1.5 py-0.5 rounded text-[10px] mono-text
          whitespace-nowrap border border-graphLight shadow-sm text-ink/80">
          {formatMarketCap(token.marketCap)}
        </div>
      )}
      
      {/* Ticker on hover */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 
        opacity-0 hover:opacity-100 transition-opacity
        bg-graphBlue text-white px-2 py-0.5 rounded text-[9px] mono-text uppercase
        whitespace-nowrap shadow-md pointer-events-none">
        {token.ticker}
      </div>
    </div>
  );
};
