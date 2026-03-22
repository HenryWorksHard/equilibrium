import { useState, useMemo } from 'react';
import type { Token } from '../types';
import { formatMarketCap } from '../data/runners';

// Visual size using log scale (not for weight calculations)
const getVisualSize = (marketCap: number): number => {
  const maxMcap = 38230116;
  const minMcap = 36558;
  const logMax = Math.log(maxMcap);
  const logMin = Math.log(minMcap);
  const logCurrent = Math.log(marketCap);
  const ratio = (logCurrent - logMin) / (logMax - logMin);
  return ratio; // Returns 0-1 for sizing
};

interface FloorTokensProps {
  tokens: Token[];
  onDragStart: (e: React.DragEvent, token: Token, source: string) => void;
}

export const FloorTokens = ({ tokens, onDragStart }: FloorTokensProps) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  
  // Generate tiered pyramid positions by market cap
  const tokenTiers = useMemo(() => {
    // Sort by market cap (largest first)
    const sorted = [...tokens].sort((a, b) => b.marketCap - a.marketCap);
    
    // Define tier sizes: [4, 6, 8, 10, 12] for pyramid effect
    const tierSizes = [4, 6, 8, 10, 12];
    const tiers: Token[][] = [];
    
    let index = 0;
    for (const size of tierSizes) {
      if (index >= sorted.length) break;
      const tierTokens = sorted.slice(index, index + size);
      if (tierTokens.length > 0) {
        tiers.push(tierTokens);
      }
      index += size;
    }
    
    // Any remaining tokens go in the last row
    if (index < sorted.length) {
      tiers.push(sorted.slice(index));
    }
    
    return tiers;
  }, [tokens]);

  if (tokens.length === 0) {
    return (
      <div className="text-center py-12 text-ink/30 mono-text text-sm">
        all tokens on the scale
      </div>
    );
  }

  // Get color fallback for broken images
  const getColor = (ticker: string): string => {
    const hash = ticker.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
    const colors = ['#f39c12', '#9b59b6', '#3498db', '#e74c3c', '#2ecc71', '#e91e63', '#ff5722', '#00bcd4'];
    return colors[Math.abs(hash) % colors.length];
  };

  // Tier labels
  const tierLabels = ['Whales', 'Runners', 'Mid-Tier', 'Emerging', 'Micros', 'Floor'];

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {tokenTiers.map((tierTokens, tierIndex) => (
        <div key={tierIndex} className="relative">
          {/* Tier label */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full hidden lg:block">
            <span className="mono-text text-[10px] text-ink/30 tracking-wider whitespace-nowrap">
              {tierLabels[tierIndex] || `Tier ${tierIndex + 1}`}
            </span>
          </div>
          
          {/* Tier row - centered */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {tierTokens.map((token) => {
              const sizeRatio = getVisualSize(token.marketCap);
              // Size scales with tier: top tier bigger
              const tierScale = 1 - (tierIndex * 0.08);
              const baseSize = 45 + sizeRatio * 25; // 45-70px range
              const size = baseSize * tierScale;
              const hasError = imgErrors[token.id];
              
              return (
                <div
                  key={token.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, token, 'pool')}
                  className="relative cursor-grab active:cursor-grabbing select-none
                    transition-all duration-150 hover:scale-110 hover:z-20
                    flex flex-col items-center"
                  style={{
                    width: Math.max(70, size + 20),
                    height: Math.max(80, size + 30),
                  }}
                >
                  {/* Token circle */}
                  {hasError ? (
                    <div 
                      className="rounded-full flex items-center justify-center border-3 border-white shadow-xl
                        hover:border-graphBlue hover:shadow-2xl transition-all"
                      style={{ 
                        width: size, 
                        height: size,
                        backgroundColor: getColor(token.ticker),
                        borderWidth: '3px'
                      }}
                    >
                      <span className="text-white font-bold" style={{ fontSize: Math.max(10, size / 3.5) }}>
                        {token.ticker.slice(0, 3)}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={token.image}
                      alt={token.name}
                      className="rounded-full object-cover border-white bg-cream shadow-xl
                        hover:border-graphBlue hover:shadow-2xl transition-all"
                      style={{ 
                        width: size, 
                        height: size,
                        borderWidth: '3px',
                        borderStyle: 'solid'
                      }}
                      draggable={false}
                      onError={() => setImgErrors(prev => ({ ...prev, [token.id]: true }))}
                    />
                  )}
                  
                  {/* Market cap badge */}
                  <div className="mt-1 bg-white px-1.5 py-0.5 rounded-full text-[9px] mono-text font-medium
                    whitespace-nowrap shadow-md text-ink/90 border border-gray-200">
                    {formatMarketCap(token.marketCap)}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Subtle tier divider */}
          {tierIndex < tokenTiers.length - 1 && (
            <div className="mt-4 mx-auto w-1/3 h-px bg-gradient-to-r from-transparent via-graphLight to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
};
