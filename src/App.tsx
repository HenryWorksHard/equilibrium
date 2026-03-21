import { useState, useCallback } from 'react';
import type { Token } from './types';
import { PUMP_RUNNERS } from './data/runners';
import { Header } from './components/Header';
import { BalanceScale } from './components/BalanceScale';
import { TokenPool } from './components/TokenPool';

function App() {
  const [poolTokens, setPoolTokens] = useState<Token[]>(PUMP_RUNNERS);
  const [leftTokens, setLeftTokens] = useState<Token[]>([]);
  const [rightTokens, setRightTokens] = useState<Token[]>([]);

  const handleDragStart = useCallback((e: React.DragEvent, token: Token, source: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ token, source }));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const removeFromSource = useCallback((token: Token, source: string) => {
    if (source === 'pool') {
      setPoolTokens(prev => prev.filter(t => t.id !== token.id));
    } else if (source === 'left') {
      setLeftTokens(prev => prev.filter(t => t.id !== token.id));
    } else if (source === 'right') {
      setRightTokens(prev => prev.filter(t => t.id !== token.id));
    }
  }, []);

  const handleDropLeft = useCallback((token: Token, source: string) => {
    if (source === 'left') return; // Already on left
    removeFromSource(token, source);
    setLeftTokens(prev => [...prev, token]);
  }, [removeFromSource]);

  const handleDropRight = useCallback((token: Token, source: string) => {
    if (source === 'right') return; // Already on right
    removeFromSource(token, source);
    setRightTokens(prev => [...prev, token]);
  }, [removeFromSource]);

  const handleDropPool = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      const { token, source } = JSON.parse(data);
      if (source === 'pool') return;
      removeFromSource(token, source);
      setPoolTokens(prev => [...prev, token]);
    }
  }, [removeFromSource]);

  const handleReset = useCallback(() => {
    setPoolTokens(PUMP_RUNNERS);
    setLeftTokens([]);
    setRightTokens([]);
  }, []);

  return (
    <div className="min-h-screen chalkboard-bg">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12">
          <BalanceScale
            leftTokens={leftTokens}
            rightTokens={rightTokens}
            onDropLeft={handleDropLeft}
            onDropRight={handleDropRight}
            onDragStart={handleDragStart}
          />
        </div>

        <div 
          onDrop={handleDropPool}
          onDragOver={(e) => e.preventDefault()}
        >
          <TokenPool
            tokens={poolTokens}
            onDragStart={handleDragStart}
          />
        </div>

        {/* Reset button */}
        <div className="text-center mt-8">
          <button
            onClick={handleReset}
            className="px-6 py-2 border border-chalk/20 rounded 
              text-chalk/40 text-xs font-mono tracking-wider
              hover:border-accent hover:text-accent transition-colors"
          >
            [ reset scale ]
          </button>
        </div>

        {/* Footer equation */}
        <footer className="mt-16 text-center pb-8">
          <div className="text-chalk/20 font-mono text-xs">
            <span className="italic">for every action, an equal and opposite reaction</span>
          </div>
          <div className="mt-4 text-chalk/10 font-mono text-[10px]">
            pump.fun equilibrium update
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
