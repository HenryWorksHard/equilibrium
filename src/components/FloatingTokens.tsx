import { useEffect, useRef, useState, useCallback } from 'react';
import type { Token } from '../types';
import { formatMarketCap, marketCapToWeight } from '../data/runners';

interface FloatingToken extends Token {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface FloatingTokensProps {
  tokens: Token[];
  onDragStart: (e: React.DragEvent, token: Token, source: string) => void;
  onDragEnd: () => void;
}

export const FloatingTokens = ({ tokens, onDragStart, onDragEnd }: FloatingTokensProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingTokens, setFloatingTokens] = useState<FloatingToken[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Initialize positions randomly
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 60;
    
    const newTokens: FloatingToken[] = tokens.map((token) => ({
      ...token,
      x: padding + Math.random() * (rect.width - padding * 2),
      y: padding + Math.random() * (rect.height - padding * 2),
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }));
    
    setFloatingTokens(newTokens);
  }, [tokens]);

  // Physics animation loop
  useEffect(() => {
    if (!containerRef.current || floatingTokens.length === 0) return;

    const animate = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const padding = 40;

      setFloatingTokens(prev => prev.map(token => {
        if (token.id === draggingId) return token;
        
        let { x, y, vx, vy } = token;
        const size = 64 + (marketCapToWeight(token.marketCap) / 100) * 32;
        const radius = size / 2;

        // Apply velocity
        x += vx;
        y += vy;

        // Bounce off walls
        if (x - radius < padding) {
          x = padding + radius;
          vx = Math.abs(vx) * 0.9;
        }
        if (x + radius > rect.width - padding) {
          x = rect.width - padding - radius;
          vx = -Math.abs(vx) * 0.9;
        }
        if (y - radius < padding) {
          y = padding + radius;
          vy = Math.abs(vy) * 0.9;
        }
        if (y + radius > rect.height - padding) {
          y = rect.height - padding - radius;
          vy = -Math.abs(vy) * 0.9;
        }

        // Add subtle random drift
        vx += (Math.random() - 0.5) * 0.02;
        vy += (Math.random() - 0.5) * 0.02;

        // Damping
        vx *= 0.995;
        vy *= 0.995;

        // Min velocity to keep things moving
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed < 0.2) {
          const angle = Math.random() * Math.PI * 2;
          vx = Math.cos(angle) * 0.3;
          vy = Math.sin(angle) * 0.3;
        }

        return { ...token, x, y, vx, vy };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [floatingTokens.length, draggingId]);

  const handleDragStart = useCallback((e: React.DragEvent, token: Token) => {
    setDraggingId(token.id);
    onDragStart(e, token, 'pool');
  }, [onDragStart]);

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    onDragEnd();
  }, [onDragEnd]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-64 overflow-hidden"
    >
      {/* Label */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
        <span className="text-ink/40 text-xs mono-text tracking-widest uppercase">
          drag runners to scale
        </span>
      </div>

      {/* Floating tokens */}
      {floatingTokens.map((token) => {
        const weight = marketCapToWeight(token.marketCap);
        const size = 64 + (weight / 100) * 32;
        
        return (
          <div
            key={token.id}
            draggable
            onDragStart={(e) => handleDragStart(e, token)}
            onDragEnd={handleDragEnd}
            className={`
              absolute cursor-grab active:cursor-grabbing
              token-circle select-none
              ${draggingId === token.id ? 'dragging' : ''}
            `}
            style={{
              left: token.x - size / 2,
              top: token.y - size / 2,
              width: size,
              height: size,
            }}
          >
            {/* Profile image */}
            <img
              src={token.image}
              alt={token.name}
              className="w-full h-full rounded-full object-cover 
                border-2 border-graphBlue/30 bg-cream
                shadow-md"
              draggable={false}
            />
            
            {/* Market cap label */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 
              bg-paper/95 px-1.5 py-0.5 rounded text-[10px] mono-text
              whitespace-nowrap border border-graphLight shadow-sm text-ink/80">
              {formatMarketCap(token.marketCap)}
            </div>
            
            {/* Ticker on hover */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 
              opacity-0 hover:opacity-100 transition-opacity
              bg-graphBlue text-white px-2 py-0.5 rounded text-[10px] mono-text uppercase
              whitespace-nowrap shadow-md">
              {token.ticker}
            </div>
          </div>
        );
      })}

      {/* Empty state */}
      {floatingTokens.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-ink/30 text-sm math-text italic">
            all runners placed on scale
          </span>
        </div>
      )}
    </div>
  );
};
