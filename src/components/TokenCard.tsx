import { useState } from 'react';
import type { Token } from '../types';
import { formatMarketCap } from '../data/runners';

interface TokenCardProps {
  token: Token;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, token: Token, source: string) => void;
  source: 'pool' | 'left' | 'right';
  compact?: boolean;
}

// Generate a color based on ticker for fallback
const getColor = (ticker: string): string => {
  const colors: Record<string, string> = {
    USELESS: '#f39c12',
    FIH: '#9b59b6',
    FREYA: '#3498db',
    BAG: '#e74c3c',
    '1COIN': '#2ecc71',
    MOMO: '#e91e63',
    WAR: '#ff5722',
    AIRCOIN: '#00bcd4',
    AOL: '#673ab7',
    ORG: '#4caf50',
    KORI: '#ff9800',
    SPSC: '#795548',
    SCAM: '#f44336',
    DCA: '#2196f3',
    HOSICO: '#ffeb3b',
    ANI: '#9c27b0',
    LETSBONK: '#ff6f00',
    IKUN: '#00acc1',
    RT: '#7c4dff',
    QX: '#76ff03',
  };
  return colors[ticker] || '#64748b';
};

export const TokenCard = ({ 
  token, 
  isDragging, 
  onDragStart, 
  source,
  compact = false 
}: TokenCardProps) => {
  const [imgError, setImgError] = useState(false);
  
  // Use log scale for VISUAL size only (so coins are all visible)
  // Weight for balance is still linear via marketCapToWeight
  const maxMcap = 38230116; // USELESS - highest
  const minMcap = 36558;    // BEST - lowest
  const logMax = Math.log(maxMcap);
  const logMin = Math.log(minMcap);
  const logCurrent = Math.log(token.marketCap);
  const sizeRatio = (logCurrent - logMin) / (logMax - logMin);
  
  // Pool tokens: 40-65px, Bucket tokens: 24-36px (tighter range)
  const size = compact 
    ? 24 + sizeRatio * 12  
    : 40 + sizeRatio * 25;
  
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
      title={`${token.name} (${token.ticker}) - ${formatMarketCap(token.marketCap)}`}
    >
      {/* Profile image or fallback */}
      {imgError ? (
        <div 
          className="w-full h-full rounded-full flex items-center justify-center border-2 border-white/30 shadow-md"
          style={{ backgroundColor: getColor(token.ticker) }}
        >
          <span className="text-white font-bold" style={{ fontSize: Math.max(8, size / 4) }}>
            {token.ticker.slice(0, 2)}
          </span>
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
      
      {/* Market cap label - only on pool tokens */}
      {!compact && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 
          bg-paper/95 px-1 py-0.5 rounded text-[9px] mono-text
          whitespace-nowrap border border-graphLight shadow-sm text-ink/80">
          {formatMarketCap(token.marketCap)}
        </div>
      )}
      
      {/* Ticker on hover */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 
        opacity-0 hover:opacity-100 transition-opacity
        bg-graphBlue text-white px-1.5 py-0.5 rounded text-[8px] mono-text uppercase
        whitespace-nowrap shadow-md pointer-events-none z-50">
        {token.ticker}
      </div>
    </div>
  );
};
