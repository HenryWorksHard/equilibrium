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
    const diff = leftWeight - rightWeight;
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
        
        {/* Stand (behind everything, doesn't rotate) */}
        <div className="absolute left-1/2 bottom-0 flex flex-col items-center z-0" style={{ transform: 'translateX(-50%)' }}>
          {/* Vertical pole */}
          <div style={{
            width: '16px',
            height: '180px',
            background: 'linear-gradient(90deg, #64748b 0%, #94a3b8 50%, #64748b 100%)',
            borderRadius: '2px',
            boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
          }} />
          {/* Base */}
          <div style={{
            width: '140px',
            height: '16px',
            background: 'linear-gradient(180deg, #64748b 0%, #475569 100%)',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            marginTop: '4px'
          }} />
        </div>

        {/* Pivot point - at top center */}
        <div className="absolute left-1/2 z-30" style={{ transform: 'translateX(-50%)', top: '100px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)',
            border: '4px solid #78350f',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#451a03' }} />
          </div>
        </div>

        {/* Rotating beam assembly - positioned at pivot */}
        <div 
          className="absolute left-1/2 z-10 transition-transform duration-500 ease-out"
          style={{ 
            top: '116px',
            transform: `translateX(-50%) rotate(${tiltAngle}deg)`,
            transformOrigin: 'center top',
            width: '560px'
          }}
        >
          {/* Horizontal beam */}
          <div style={{
            height: '12px',
            background: 'linear-gradient(180deg, #b45309 0%, #92400e 50%, #78350f 100%)',
            borderRadius: '2px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />

          {/* Left and Right bucket assemblies */}
          <div className="flex justify-between" style={{ marginTop: '0px' }}>
            
            {/* Left side */}
            <div className="flex flex-col items-center">
              {/* Chains */}
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '3px',
                    height: '50px',
                    background: 'linear-gradient(180deg, #64748b 0%, #475569 100%)',
                    borderRadius: '2px'
                  }} />
                ))}
              </div>
              
              {/* Left bucket */}
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
                {/* Bucket rim */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '10px',
                  background: 'linear-gradient(180deg, #64748b 0%, #475569 100%)',
                  borderRadius: '4px 4px 0 0'
                }} />
                
                {/* Bucket body */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '5%',
                  right: '5%',
                  bottom: 0,
                  background: 'linear-gradient(180deg, #475569 0%, #334155 100%)',
                  borderRadius: '0 0 12px 12px',
                  clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)',
                  boxShadow: isLeftOver ? '0 0 20px rgba(59, 130, 246, 0.5)' : '0 4px 8px rgba(0,0,0,0.2)'
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
                
                {/* Drop hint */}
                {leftTokens.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span style={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace' }}>drop here</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-center">
              {/* Chains */}
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '3px',
                    height: '50px',
                    background: 'linear-gradient(180deg, #64748b 0%, #475569 100%)',
                    borderRadius: '2px'
                  }} />
                ))}
              </div>
              
              {/* Right bucket */}
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
                {/* Bucket rim */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '10px',
                  background: 'linear-gradient(180deg, #64748b 0%, #475569 100%)',
                  borderRadius: '4px 4px 0 0'
                }} />
                
                {/* Bucket body */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '5%',
                  right: '5%',
                  bottom: 0,
                  background: 'linear-gradient(180deg, #475569 0%, #334155 100%)',
                  borderRadius: '0 0 12px 12px',
                  clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%)',
                  boxShadow: isRightOver ? '0 0 20px rgba(59, 130, 246, 0.5)' : '0 4px 8px rgba(0,0,0,0.2)'
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
                
                {/* Drop hint */}
                {rightTokens.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span style={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace' }}>drop here</span>
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
