import { useState, useMemo } from 'react';
import type { Token } from '../types';
import { TokenCard } from './TokenCard';
import { marketCapToWeight } from '../data/runners';

interface BalanceScaleProps {
  leftTokens: Token[];
  rightTokens: Token[];
  onDropLeft: (token: Token, source: string) => void;
  onDropRight: (token: Token, source: string) => void;
  onDragStart: (e: React.DragEvent, token: Token, source: string) => void;
}

export const BalanceScale = ({
  leftTokens,
  rightTokens,
  onDropLeft,
  onDropRight,
  onDragStart
}: BalanceScaleProps) => {
  const [isLeftOver, setIsLeftOver] = useState(false);
  const [isRightOver, setIsRightOver] = useState(false);

  // Calculate weights
  const leftWeight = useMemo(() => 
    leftTokens.reduce((sum, t) => sum + marketCapToWeight(t.marketCap), 0),
    [leftTokens]
  );
  
  const rightWeight = useMemo(() => 
    rightTokens.reduce((sum, t) => sum + marketCapToWeight(t.marketCap), 0),
    [rightTokens]
  );

  // Calculate tilt angle (max 15 degrees)
  const tiltAngle = useMemo(() => {
    const diff = leftWeight - rightWeight;
    const totalWeight = leftWeight + rightWeight;
    if (totalWeight === 0) return 0;
    const ratio = diff / Math.max(totalWeight, 200);
    return Math.max(-15, Math.min(15, ratio * 30));
  }, [leftWeight, rightWeight]);

  // Check if balanced (within 5% tolerance)
  const isBalanced = useMemo(() => {
    const total = leftWeight + rightWeight;
    if (total === 0) return true;
    return Math.abs(leftWeight - rightWeight) / total < 0.05;
  }, [leftWeight, rightWeight]);

  const handleDrop = (e: React.DragEvent, side: 'left' | 'right') => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      const { token, source } = JSON.parse(data);
      if (side === 'left') {
        onDropLeft(token, source);
      } else {
        onDropRight(token, source);
      }
    }
    setIsLeftOver(false);
    setIsRightOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Balance indicator */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center">
        <div className={`font-mono text-sm tracking-wider transition-colors duration-500
          ${isBalanced ? 'text-green-400' : 'text-chalk/60'}`}>
          {isBalanced ? '[ EQUILIBRIUM ACHIEVED ]' : '[ SEEKING BALANCE ]'}
        </div>
        <div className="text-xs text-chalk/40 mt-1 font-mono">
          {leftWeight.toFixed(0)} : {rightWeight.toFixed(0)}
        </div>
      </div>

      {/* Fulcrum / Support */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0
        border-l-[30px] border-r-[30px] border-b-[60px]
        border-l-transparent border-r-transparent border-b-slate/80" />

      {/* Main beam container */}
      <div 
        className="relative h-80 transition-transform duration-700 ease-out origin-center"
        style={{ transform: `rotate(${tiltAngle}deg)` }}
      >
        {/* Horizontal beam */}
        <div className="absolute top-1/2 left-0 right-0 h-3 scale-beam rounded-sm" />

        {/* Center pivot point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-6 h-6 rounded-full bg-accent/80 border-2 border-chalk/20
          flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-chalk/60" />
        </div>

        {/* Left pan */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {/* Chain */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-px h-8 bg-chalk/30" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-2 h-4 border-2 border-chalk/30 rounded-sm" />
          
          {/* Pan */}
          <div
            onDrop={(e) => handleDrop(e, 'left')}
            onDragOver={handleDragOver}
            onDragEnter={() => setIsLeftOver(true)}
            onDragLeave={() => setIsLeftOver(false)}
            className={`
              w-40 h-40 rounded-full border-2 transition-colors duration-200
              flex flex-wrap items-center justify-center gap-2 p-3
              ${isLeftOver 
                ? 'border-accent bg-accent/10' 
                : 'border-chalk/20 bg-slate/30'}
            `}
          >
            {leftTokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                source="left"
                onDragStart={onDragStart}
                compact
              />
            ))}
            {leftTokens.length === 0 && (
              <span className="text-chalk/30 text-xs font-mono">drop here</span>
            )}
          </div>
        </div>

        {/* Right pan */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {/* Chain */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-px h-8 bg-chalk/30" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-2 h-4 border-2 border-chalk/30 rounded-sm" />
          
          {/* Pan */}
          <div
            onDrop={(e) => handleDrop(e, 'right')}
            onDragOver={handleDragOver}
            onDragEnter={() => setIsRightOver(true)}
            onDragLeave={() => setIsRightOver(false)}
            className={`
              w-40 h-40 rounded-full border-2 transition-colors duration-200
              flex flex-wrap items-center justify-center gap-2 p-3
              ${isRightOver 
                ? 'border-accent bg-accent/10' 
                : 'border-chalk/20 bg-slate/30'}
            `}
          >
            {rightTokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                source="right"
                onDragStart={onDragStart}
                compact
              />
            ))}
            {rightTokens.length === 0 && (
              <span className="text-chalk/30 text-xs font-mono">drop here</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
