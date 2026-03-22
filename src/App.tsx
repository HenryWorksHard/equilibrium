import { useState, useCallback } from 'react';
import type { Token } from './types';
import { PUMP_RUNNERS } from './data/runners';
import { Header } from './components/Header';
import { ClassicScale } from './components/ClassicScale';
import { FloorTokens } from './components/FloorTokens';
import { Sidebar } from './components/Sidebar';

function App() {
  const [poolTokens, setPoolTokens] = useState<Token[]>(PUMP_RUNNERS);
  const [leftTokens, setLeftTokens] = useState<Token[]>([]);
  const [rightTokens, setRightTokens] = useState<Token[]>([]);
  const [isLeftOver, setIsLeftOver] = useState(false);
  const [isRightOver, setIsRightOver] = useState(false);

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
    if (source === 'left') return;
    removeFromSource(token, source);
    setLeftTokens(prev => [...prev, token]);
  }, [removeFromSource]);

  const handleDropRight = useCallback((token: Token, source: string) => {
    if (source === 'right') return;
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
    <div className="min-h-screen graph-paper">
      <Sidebar />
      
      <div className="flex flex-col items-center px-4 py-8 ml-20 md:ml-24">
        <Header />
        
        {/* Scale */}
        <div className="mt-20 md:mt-24">
          <ClassicScale
            leftTokens={leftTokens}
            rightTokens={rightTokens}
            onDropLeft={handleDropLeft}
            onDropRight={handleDropRight}
            onDragStart={handleDragStart}
            isLeftOver={isLeftOver}
            isRightOver={isRightOver}
            setIsLeftOver={setIsLeftOver}
            setIsRightOver={setIsRightOver}
          />
        </div>

        {/* Floor area with tokens */}
        <div 
          className="mt-24 md:mt-32 lg:mt-40 floor-area rounded-xl p-10 min-h-[200px]"
          onDrop={handleDropPool}
          onDragOver={(e) => e.preventDefault()}
        >
          <FloorTokens
            tokens={poolTokens}
            onDragStart={handleDragStart}
          />
        </div>

        {/* Reset button */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleReset}
            className="px-4 py-2 mono-text text-sm bg-paper border border-graphLight
              rounded-lg shadow-md hover:bg-cream hover:border-graphBlue
              transition-colors text-ink/70 hover:text-ink"
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
