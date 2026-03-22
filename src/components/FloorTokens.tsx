import { useMemo } from 'react';
import type { Token } from '../types';
import { formatMarketCap, marketCapToWeight } from '../data/runners';

interface FloorTokensProps {
  tokens: Token[];
  onDragStart: (e: React.DragEvent, token: Token, source: string) => void;
}

export const FloorTokens = ({ tokens, onDragStart }: FloorTokensProps) => {
  // Spread tokens evenly across the width with some randomness
  const tokenPositions = useMemo(() => {
    const count = tokens.length;
    return tokens.map((token, index) => {
      // Spread evenly across width with slight random offset
      const hash = token.id.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
      const baseX = ((index + 0.5) / count) * 90 + 5; // 5-95% spread evenly
      const randomOffset = ((hash % 20) - 10) / count; // Small random offset
      const x = Math.max(5, Math.min(95, baseX + randomOffset));
      const y = 10 + (Math.abs(hash * 3) % 40); // 10-50px from bottom
      const rotation = ((hash % 20) - 10); // -10 to 10 degrees
      
      return { x, y, rotation };
    });
  }, [tokens]);

  if (tokens.length === 0) {
    return (
      <div className="text-center py-12 text-ink/30 mono-text text-sm">
        all tokens on the scale
      </div>
    );
  }

  return (
    <div className="relative w-full h-[200px]">
      {/* Scattered tokens */}
      {tokens.map((token, index) => {
        const weight = marketCapToWeight(token.marketCap);
        // Size: 50-90px based on weight
        const size = 50 + (weight / 100) * 40;
        const pos = tokenPositions[index];
        
        return (
          <div
            key={token.id}
            draggable
            onDragStart={(e) => onDragStart(e, token, 'pool')}
            className="absolute cursor-grab active:cursor-grabbing select-none
              transition-transform duration-150 hover:scale-110 hover:z-20"
            style={{
              left: `${pos.x}%`,
              bottom: `${pos.y}px`,
              transform: `translateX(-50%) rotate(${pos.rotation}deg)`,
              width: size,
              height: size,
              zIndex: index,
            }}
          >
            {/* Token circle */}
            <img
              src={token.image}
              alt={token.name}
              className="w-full h-full rounded-full object-cover 
                border-3 border-white bg-cream shadow-xl
                hover:border-graphBlue hover:shadow-2xl transition-all"
              style={{ borderWidth: '3px' }}
              draggable={false}
            />
            
            {/* Market cap badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 
              bg-white px-2 py-1 rounded-full text-[10px] mono-text font-medium
              whitespace-nowrap shadow-md text-ink/90 border border-gray-200">
              {formatMarketCap(token.marketCap)}
            </div>
            
            {/* Ticker on hover */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 
              opacity-0 hover:opacity-100 transition-opacity pointer-events-none
              bg-gray-900 text-white px-2 py-1 rounded text-[10px] mono-text uppercase
              whitespace-nowrap shadow-lg">
              {token.ticker}
            </div>
          </div>
        );
      })}
    </div>
  );
};
