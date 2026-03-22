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
        {/* Top area scribbles - calculus & algebra */}
        <span className="absolute top-[8%] left-[18%] font-[Caveat] text-2xl text-[#6a8aaa] opacity-22 rotate-[-3deg]">
          ∫ f(x)dx
        </span>
        <span className="absolute top-[5%] right-[15%] font-[Caveat] text-xl text-[#8a6a6a] opacity-20 rotate-[6deg]">
          π ≈ 3.14159...
        </span>
        <span className="absolute top-[14%] right-[32%] font-[Caveat] text-lg text-[#6a7a8a] opacity-18 rotate-[-5deg]">
          sin²θ + cos²θ = 1
        </span>
        <span className="absolute top-[3%] left-[45%] font-[Caveat] text-xl text-[#7a8a7a] opacity-16 rotate-[2deg]">
          e^(iπ) + 1 = 0
        </span>
        
        {/* Geometry - triangles, circles, angles */}
        <span className="absolute top-[22%] left-[8%] font-[Caveat] text-xl text-[#8a7a6a] opacity-20 rotate-[-8deg]">
          A = πr²
        </span>
        <span className="absolute top-[28%] right-[8%] font-[Caveat] text-lg text-[#6a8a8a] opacity-18 rotate-[4deg]">
          C = 2πr
        </span>
        <span className="absolute top-[35%] left-[30%] font-[Caveat] text-xl text-[#7a6a8a] opacity-16 rotate-[-2deg]">
          a² + b² = c²
        </span>
        <span className="absolute top-[18%] left-[55%] font-[Caveat] text-lg text-[#8a8a6a] opacity-15 rotate-[7deg]">
          V = ⁴⁄₃πr³
        </span>
        
        {/* Side scribbles */}
        <span className="absolute top-[40%] left-[3%] font-[Caveat] text-xl text-[#7a8a6a] opacity-22 rotate-[-12deg]">
          Σ xᵢ
        </span>
        <span className="absolute top-[55%] right-[3%] font-[Caveat] text-2xl text-[#8a7a6a] opacity-20 rotate-[8deg]">
          ∞
        </span>
        <span className="absolute top-[48%] right-[6%] font-[Caveat] text-lg text-[#6a7a8a] opacity-16 rotate-[-5deg]">
          θ = 90°
        </span>
        
        {/* More geometry */}
        <span className="absolute top-[60%] left-[12%] font-[Caveat] text-xl text-[#8a6a7a] opacity-18 rotate-[3deg]">
          A = ½bh
        </span>
        <span className="absolute top-[52%] left-[35%] font-[Caveat] text-lg text-[#6a8a6a] opacity-15 rotate-[-6deg]">
          tan θ = opp/adj
        </span>
        <span className="absolute top-[45%] right-[22%] font-[Caveat] text-xl text-[#7a7a8a] opacity-18 rotate-[5deg]">
          180° - α - β
        </span>
        
        {/* Bottom scribbles */}
        <span className="absolute bottom-[28%] left-[15%] font-[Caveat] text-xl text-[#6a6a8a] opacity-18 rotate-[3deg]">
          lim x→∞
        </span>
        <span className="absolute bottom-[10%] left-[38%] font-[Caveat] text-lg text-[#7a6a7a] opacity-20 rotate-[-4deg]">
          y = mx + b
        </span>
        <span className="absolute bottom-[22%] right-[20%] font-[Caveat] text-xl text-[#6a8a7a] opacity-22 rotate-[5deg]">
          F = ma
        </span>
        <span className="absolute bottom-[6%] right-[35%] font-[Caveat] text-lg text-[#8a7a7a] opacity-16 rotate-[-3deg]">
          S = 4πr²
        </span>
        <span className="absolute bottom-[15%] left-[5%] font-[Caveat] text-xl text-[#7a8a8a] opacity-18 rotate-[8deg]">
          ∠ABC
        </span>
        
        {/* Scattered small ones */}
        <span className="absolute top-[30%] left-[48%] font-[Caveat] text-lg text-[#8a8a6a] opacity-14 rotate-[-7deg]">
          √2
        </span>
        <span className="absolute top-[68%] left-[58%] font-[Caveat] text-xl text-[#6a7a7a] opacity-16 rotate-[10deg]">
          Δ
        </span>
        <span className="absolute bottom-[38%] right-[10%] font-[Caveat] text-lg text-[#7a7a8a] opacity-20 rotate-[-2deg]">
          ∂y/∂x
        </span>
        <span className="absolute bottom-[32%] left-[42%] font-[Caveat] text-xl text-[#6a8a8a] opacity-15 rotate-[4deg]">
          ≈
        </span>
        <span className="absolute top-[75%] right-[42%] font-[Caveat] text-lg text-[#8a6a8a] opacity-18 rotate-[-8deg]">
          ∮ dl
        </span>
        <span className="absolute bottom-[45%] left-[25%] font-[Caveat] text-xl text-[#7a8a6a] opacity-16 rotate-[6deg]">
          ⊥
        </span>
        <span className="absolute top-[82%] left-[18%] font-[Caveat] text-lg text-[#6a6a8a] opacity-18 rotate-[-4deg]">
          ∥
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
