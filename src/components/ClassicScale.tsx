import { useMemo } from 'react';
import type { Token } from '../types';
import { TokenCard } from './TokenCard';
import { marketCapToWeight } from '../data/runners';

interface ClassicScaleProps {
  leftTokens: Token[];
  rightTokens: Token[];
  onDropLeft: (token: Token, source: string) => void;
  onDropRight: (token: Token, source: string) => void;
  onDragStart: (e: React.DragEvent, token: Token, source: string) => void;
  isLeftOver: boolean;
  isRightOver: boolean;
  setIsLeftOver: (v: boolean) => void;
  setIsRightOver: (v: boolean) => void;
}

export const ClassicScale = ({
  leftTokens,
  rightTokens,
  onDropLeft,
  onDropRight,
  onDragStart,
  isLeftOver,
  isRightOver,
  setIsLeftOver,
  setIsRightOver,
}: ClassicScaleProps) => {
  const leftWeight = useMemo(() => 
    leftTokens.reduce((sum, t) => sum + marketCapToWeight(t.marketCap), 0),
    [leftTokens]
  );
  
  const rightWeight = useMemo(() => 
    rightTokens.reduce((sum, t) => sum + marketCapToWeight(t.marketCap), 0),
    [rightTokens]
  );

  const tiltAngle = useMemo(() => {
    const diff = rightWeight - leftWeight; // Inverted: heavier side drops
    const totalWeight = leftWeight + rightWeight;
    if (totalWeight === 0) return 0;
    const ratio = diff / Math.max(totalWeight, 100);
    return Math.max(-15, Math.min(15, ratio * 30));
  }, [leftWeight, rightWeight]);

  const isBalanced = useMemo(() => {
    const total = leftWeight + rightWeight;
    if (total === 0) return true;
    return Math.abs(leftWeight - rightWeight) / total < 0.05;
  }, [leftWeight, rightWeight]);

  const handleDrop = (e: React.DragEvent, side: 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();
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
    e.stopPropagation();
  };

  return (
    <div className="w-full flex flex-col items-center py-4">
      {/* Balance indicator */}
      <div className="text-center mb-2 h-8">
        <div className={`mono-text text-lg tracking-wider transition-colors duration-500
          ${isBalanced && (leftWeight + rightWeight > 0) ? 'text-green-600 font-bold' : 'text-ink/40'}`}>
          {isBalanced && (leftWeight + rightWeight > 0) ? '⚖️ BALANCED!' : ''}
        </div>
        {(leftWeight + rightWeight > 0) && (
          <div className="text-sm text-ink/50 mono-text">
            {leftWeight.toFixed(0)} vs {rightWeight.toFixed(0)}
          </div>
        )}
      </div>

      {/* Scale assembly - everything in one container */}
      <div className="relative" style={{ width: '600px', height: '300px' }}>
        
        {/* Stand (behind everything, doesn't rotate) - hand-drawn style */}
        <div className="absolute left-1/2 bottom-0 flex flex-col items-center z-0" style={{ transform: 'translateX(-50%)' }}>
          {/* Vertical pole - sketchy pencil style */}
          <div style={{
            width: '12px',
            height: '280px',
            background: '#3a3a3a',
            border: '2px solid #2a2a2a',
            borderRadius: '1px',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
          }} />
          {/* Base - hand-drawn */}
          <div style={{
            width: '140px',
            height: '14px',
            background: '#3a3a3a',
            border: '2px solid #2a2a2a',
            borderRadius: '2px',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
            marginTop: '4px'
          }} />
        </div>

        {/* Pivot point - hand-drawn circle */}
        <div className="absolute left-1/2 z-30" style={{ transform: 'translateX(-50%)', top: '0px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#f5f0e8',
            border: '3px solid #3a3a3a',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a3a3a' }} />
          </div>
        </div>

        {/* Rotating beam assembly - positioned at pivot (top) */}
        <div 
          className="absolute left-1/2 z-10 transition-transform duration-500 ease-out"
          style={{ 
            top: '16px',
            transform: `translateX(-50%) rotate(${tiltAngle}deg)`,
            transformOrigin: 'center top',
            width: '560px'
          }}
        >
          {/* Horizontal beam - hand-drawn style */}
          <div style={{
            height: '10px',
            background: '#3a3a3a',
            border: '2px solid #2a2a2a',
            borderRadius: '1px',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
          }} />

          {/* Left and Right bucket assemblies */}
          <div className="flex justify-between" style={{ marginTop: '0px' }}>
            
            {/* Left side */}
            <div className="flex flex-col items-center">
              {/* Chains - hand-drawn lines */}
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '2px',
                    height: '50px',
                    background: '#3a3a3a',
                    borderRadius: '1px'
                  }} />
                ))}
              </div>
              
              {/* Left bucket - hand-drawn style */}
              <div
                onDrop={(e) => handleDrop(e, 'left')}
                onDragOver={handleDragOver}
                onDragEnter={() => setIsLeftOver(true)}
                onDragLeave={() => setIsLeftOver(false)}
                className="relative cursor-pointer transition-transform duration-200"
                style={{
                  width: '120px',
                  height: '80px',
                  transform: isLeftOver ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {/* Bucket rim - sketchy */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  background: '#f5f0e8',
                  border: '2px solid #3a3a3a',
                  borderRadius: '3px 3px 0 0'
                }} />
                
                {/* Bucket body - hand-drawn trapezoid */}
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  left: '5%',
                  right: '5%',
                  bottom: 0,
                  background: '#f5f0e8',
                  border: '2px solid #3a3a3a',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)',
                  boxShadow: isLeftOver ? '0 0 15px rgba(74, 111, 165, 0.4)' : '3px 3px 0 rgba(0,0,0,0.1)'
                }} />
                
                {/* Tokens inside */}
                <div className="absolute inset-2 flex flex-wrap items-end justify-center content-end gap-1 overflow-hidden z-10" style={{ top: '14px' }}>
                  {leftTokens.map((token) => (
                    <TokenCard
                      key={token.id}
                      token={token}
                      source="left"
                      onDragStart={onDragStart}
                      compact
                    />
                  ))}
                </div>
                
                {/* Drop hint - handwritten */}
                {leftTokens.length === 0 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
                    <span style={{ color: '#6a6a6a', fontSize: '14px', fontFamily: 'Caveat, cursive' }}>drop here</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-center">
              {/* Chains - hand-drawn lines */}
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '2px',
                    height: '50px',
                    background: '#3a3a3a',
                    borderRadius: '1px'
                  }} />
                ))}
              </div>
              
              {/* Right bucket - hand-drawn style */}
              <div
                onDrop={(e) => handleDrop(e, 'right')}
                onDragOver={handleDragOver}
                onDragEnter={() => setIsRightOver(true)}
                onDragLeave={() => setIsRightOver(false)}
                className="relative cursor-pointer transition-transform duration-200"
                style={{
                  width: '120px',
                  height: '80px',
                  transform: isRightOver ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {/* Bucket rim - sketchy */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  background: '#f5f0e8',
                  border: '2px solid #3a3a3a',
                  borderRadius: '3px 3px 0 0'
                }} />
                
                {/* Bucket body - hand-drawn trapezoid */}
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  left: '5%',
                  right: '5%',
                  bottom: 0,
                  background: '#f5f0e8',
                  border: '2px solid #3a3a3a',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)',
                  boxShadow: isRightOver ? '0 0 15px rgba(74, 111, 165, 0.4)' : '3px 3px 0 rgba(0,0,0,0.1)'
                }} />
                
                {/* Tokens inside */}
                <div className="absolute inset-2 flex flex-wrap items-end justify-center content-end gap-1 overflow-hidden z-10" style={{ top: '14px' }}>
                  {rightTokens.map((token) => (
                    <TokenCard
                      key={token.id}
                      token={token}
                      source="right"
                      onDragStart={onDragStart}
                      compact
                    />
                  ))}
                </div>
                
                {/* Drop hint - handwritten */}
                {rightTokens.length === 0 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
                    <span style={{ color: '#6a6a6a', fontSize: '14px', fontFamily: 'Caveat, cursive' }}>drop here</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
