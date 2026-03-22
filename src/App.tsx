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
      {/* Math scribbles background */}
      <div className="math-scribbles" aria-hidden="true" />
      
      {/* Additional hand-drawn scribbles */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
        {/* Top area scribbles */}
        <span className="absolute top-[12%] left-[25%] font-[Caveat] text-2xl text-[#6a8aaa] opacity-20 rotate-[-3deg]">
          ∫ f(x)dx
        </span>
        <span className="absolute top-[6%] right-[20%] font-[Caveat] text-xl text-[#8a6a6a] opacity-18 rotate-[6deg]">
          π ≈ 3.14159...
        </span>
        <span className="absolute top-[18%] right-[35%] font-[Caveat] text-lg text-[#6a7a8a] opacity-15 rotate-[-5deg]">
          sin²θ + cos²θ = 1
        </span>
        
        {/* Side scribbles */}
        <span className="absolute top-[40%] left-[3%] font-[Caveat] text-xl text-[#7a8a6a] opacity-20 rotate-[-12deg] writing-vertical">
          Σ xᵢ
        </span>
        <span className="absolute top-[55%] right-[3%] font-[Caveat] text-2xl text-[#8a7a6a] opacity-18 rotate-[8deg]">
          ∞
        </span>
        
        {/* Bottom scribbles */}
        <span className="absolute bottom-[25%] left-[15%] font-[Caveat] text-xl text-[#6a6a8a] opacity-15 rotate-[3deg]">
          lim x→∞
        </span>
        <span className="absolute bottom-[8%] left-[40%] font-[Caveat] text-lg text-[#7a6a7a] opacity-18 rotate-[-4deg]">
          y = mx + b
        </span>
        <span className="absolute bottom-[20%] right-[25%] font-[Caveat] text-xl text-[#6a8a7a] opacity-20 rotate-[5deg]">
          F = ma
        </span>
        
        {/* Scattered small ones */}
        <span className="absolute top-[30%] left-[45%] font-[Caveat] text-lg text-[#8a8a6a] opacity-12 rotate-[-7deg]">
          √2
        </span>
        <span className="absolute top-[65%] left-[55%] font-[Caveat] text-xl text-[#6a7a7a] opacity-15 rotate-[10deg]">
          Δ
        </span>
        <span className="absolute bottom-[35%] right-[12%] font-[Caveat] text-lg text-[#7a7a8a] opacity-18 rotate-[-2deg]">
          ∂y/∂x
        </span>
      </div>
      
      <Sidebar />
      
      <div className="flex flex-col items-center px-4 pt-12 pb-8 ml-20 md:ml-24">
        <Header />
        
        {/* Scale - extra spacing around it */}
        <div className="mt-12 mb-8">
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

        {/* Reset button - between scale and coins */}
        <div className="mt-8 mb-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 mono-text text-sm bg-paper border border-graphLight
              rounded-lg shadow-md hover:bg-cream hover:border-graphBlue
              transition-colors text-ink/70 hover:text-ink"
          >
            ↺ Reset
          </button>
        </div>

        {/* Floor area with tokens */}
        <div 
          className="floor-area rounded-xl p-10 min-h-[200px] w-full max-w-4xl"
          onDrop={handleDropPool}
          onDragOver={(e) => e.preventDefault()}
        >
          <FloorTokens
            tokens={poolTokens}
            onDragStart={handleDragStart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
