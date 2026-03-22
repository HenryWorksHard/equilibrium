// Build v3 - fixed visual sizing for all tokens
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
        <span className="absolute top-[8%] left-[18%] font-[Caveat] text-3xl rotate-[-3deg]" style={{ color: '#5a7a9a', opacity: 0.35 }}>
          ∫ f(x)dx
        </span>
        <span className="absolute top-[5%] right-[15%] font-[Caveat] text-2xl rotate-[6deg]" style={{ color: '#7a5a5a', opacity: 0.32 }}>
          π ≈ 3.14159...
        </span>
        <span className="absolute top-[14%] right-[32%] font-[Caveat] text-xl rotate-[-5deg]" style={{ color: '#5a6a7a', opacity: 0.30 }}>
          sin²θ + cos²θ = 1
        </span>
        <span className="absolute top-[3%] left-[45%] font-[Caveat] text-2xl rotate-[2deg]" style={{ color: '#6a7a6a', opacity: 0.28 }}>
          e^(iπ) + 1 = 0
        </span>
        
        {/* Geometry - triangles, circles, angles */}
        <span className="absolute top-[22%] left-[8%] font-[Caveat] text-2xl rotate-[-8deg]" style={{ color: '#7a6a5a', opacity: 0.32 }}>
          A = πr²
        </span>
        <span className="absolute top-[28%] right-[8%] font-[Caveat] text-xl rotate-[4deg]" style={{ color: '#5a7a7a', opacity: 0.30 }}>
          C = 2πr
        </span>
        <span className="absolute top-[35%] left-[30%] font-[Caveat] text-2xl rotate-[-2deg]" style={{ color: '#6a5a7a', opacity: 0.28 }}>
          a² + b² = c²
        </span>
        <span className="absolute top-[18%] left-[55%] font-[Caveat] text-xl rotate-[7deg]" style={{ color: '#7a7a5a', opacity: 0.26 }}>
          V = ⁴⁄₃πr³
        </span>
        
        {/* Side scribbles */}
        <span className="absolute top-[40%] left-[3%] font-[Caveat] text-2xl rotate-[-12deg]" style={{ color: '#6a7a5a', opacity: 0.35 }}>
          Σ xᵢ
        </span>
        <span className="absolute top-[55%] right-[3%] font-[Caveat] text-4xl rotate-[8deg]" style={{ color: '#7a6a5a', opacity: 0.32 }}>
          ∞
        </span>
        <span className="absolute top-[48%] right-[6%] font-[Caveat] text-xl rotate-[-5deg]" style={{ color: '#5a6a7a', opacity: 0.28 }}>
          θ = 90°
        </span>
        
        {/* More geometry */}
        <span className="absolute top-[60%] left-[12%] font-[Caveat] text-2xl rotate-[3deg]" style={{ color: '#7a5a6a', opacity: 0.30 }}>
          A = ½bh
        </span>
        <span className="absolute top-[52%] left-[35%] font-[Caveat] text-xl rotate-[-6deg]" style={{ color: '#5a7a5a', opacity: 0.26 }}>
          tan θ = opp/adj
        </span>
        <span className="absolute top-[45%] right-[22%] font-[Caveat] text-2xl rotate-[5deg]" style={{ color: '#6a6a7a', opacity: 0.30 }}>
          180° - α - β
        </span>
        
        {/* Bottom scribbles */}
        <span className="absolute bottom-[28%] left-[15%] font-[Caveat] text-2xl rotate-[3deg]" style={{ color: '#5a5a7a', opacity: 0.30 }}>
          lim x→∞
        </span>
        <span className="absolute bottom-[10%] left-[38%] font-[Caveat] text-xl rotate-[-4deg]" style={{ color: '#6a5a6a', opacity: 0.32 }}>
          y = mx + b
        </span>
        <span className="absolute bottom-[22%] right-[20%] font-[Caveat] text-2xl rotate-[5deg]" style={{ color: '#5a7a6a', opacity: 0.35 }}>
          F = ma
        </span>
        <span className="absolute bottom-[6%] right-[35%] font-[Caveat] text-xl rotate-[-3deg]" style={{ color: '#7a6a6a', opacity: 0.28 }}>
          S = 4πr²
        </span>
        <span className="absolute bottom-[15%] left-[5%] font-[Caveat] text-2xl rotate-[8deg]" style={{ color: '#6a7a7a', opacity: 0.30 }}>
          ∠ABC
        </span>
        
        {/* Scattered small ones */}
        <span className="absolute top-[30%] left-[48%] font-[Caveat] text-xl rotate-[-7deg]" style={{ color: '#7a7a5a', opacity: 0.25 }}>
          √2
        </span>
        <span className="absolute top-[68%] left-[58%] font-[Caveat] text-3xl rotate-[10deg]" style={{ color: '#5a6a6a', opacity: 0.28 }}>
          Δ
        </span>
        <span className="absolute bottom-[38%] right-[10%] font-[Caveat] text-xl rotate-[-2deg]" style={{ color: '#6a6a7a', opacity: 0.32 }}>
          ∂y/∂x
        </span>
        <span className="absolute bottom-[32%] left-[42%] font-[Caveat] text-3xl rotate-[4deg]" style={{ color: '#5a7a7a', opacity: 0.26 }}>
          ≈
        </span>
        <span className="absolute top-[75%] right-[42%] font-[Caveat] text-xl rotate-[-8deg]" style={{ color: '#7a5a7a', opacity: 0.30 }}>
          ∮ dl
        </span>
        <span className="absolute bottom-[45%] left-[25%] font-[Caveat] text-3xl rotate-[6deg]" style={{ color: '#6a7a5a', opacity: 0.28 }}>
          ⊥
        </span>
        <span className="absolute top-[82%] left-[18%] font-[Caveat] text-2xl rotate-[-4deg]" style={{ color: '#5a5a7a', opacity: 0.30 }}>
          ∥
        </span>
        
        {/* More calculus & advanced math */}
        <span className="absolute top-[12%] left-[72%] font-[Caveat] text-2xl rotate-[-6deg]" style={{ color: '#4a6a8a', opacity: 0.32 }}>
          d/dx(eˣ) = eˣ
        </span>
        <span className="absolute top-[6%] left-[28%] font-[Caveat] text-2xl rotate-[4deg]" style={{ color: '#6a4a7a', opacity: 0.30 }}>
          ∇ × F
        </span>
        <span className="absolute top-[20%] right-[12%] font-[Caveat] text-xl rotate-[-3deg]" style={{ color: '#5a6a5a', opacity: 0.28 }}>
          ∫₀^∞ e⁻ˣ² dx = √π/2
        </span>
        <span className="absolute top-[9%] right-[45%] font-[Caveat] text-2xl rotate-[8deg]" style={{ color: '#7a5a5a', opacity: 0.29 }}>
          Σ 1/n²
        </span>
        
        {/* Geometry drawings (text-based) */}
        <span className="absolute top-[38%] right-[15%] font-[Caveat] text-5xl rotate-[2deg]" style={{ color: '#5a7a6a', opacity: 0.25 }}>
          △
        </span>
        <span className="absolute top-[25%] left-[62%] font-[Caveat] text-3xl rotate-[-10deg]" style={{ color: '#6a6a7a', opacity: 0.28 }}>
          ○ r=5
        </span>
        <span className="absolute bottom-[52%] right-[28%] font-[Caveat] text-2xl rotate-[6deg]" style={{ color: '#7a6a5a', opacity: 0.30 }}>
          □ A=s²
        </span>
        <span className="absolute top-[42%] left-[68%] font-[Caveat] text-3xl rotate-[-4deg]" style={{ color: '#5a5a7a', opacity: 0.26 }}>
          ◇
        </span>
        
        {/* More physics & science */}
        <span className="absolute bottom-[18%] left-[52%] font-[Caveat] text-2xl rotate-[3deg]" style={{ color: '#6a7a5a', opacity: 0.32 }}>
          PV = nRT
        </span>
        <span className="absolute bottom-[42%] right-[38%] font-[Caveat] text-xl rotate-[-5deg]" style={{ color: '#5a6a7a', opacity: 0.28 }}>
          λ = h/p
        </span>
        <span className="absolute top-[58%] right-[48%] font-[Caveat] text-2xl rotate-[7deg]" style={{ color: '#7a5a6a', opacity: 0.30 }}>
          ΔG = ΔH - TΔS
        </span>
        <span className="absolute bottom-[8%] left-[18%] font-[Caveat] text-xl rotate-[-2deg]" style={{ color: '#6a6a6a', opacity: 0.29 }}>
          ω = 2πf
        </span>
        
        {/* Trigonometry */}
        <span className="absolute top-[65%] left-[8%] font-[Caveat] text-2xl rotate-[5deg]" style={{ color: '#4a7a7a', opacity: 0.31 }}>
          sin(α±β)
        </span>
        <span className="absolute bottom-[55%] left-[45%] font-[Caveat] text-xl rotate-[-8deg]" style={{ color: '#7a4a6a', opacity: 0.26 }}>
          cos²θ
        </span>
        <span className="absolute top-[72%] right-[18%] font-[Caveat] text-2xl rotate-[3deg]" style={{ color: '#5a7a4a', opacity: 0.30 }}>
          arctan(x)
        </span>
        
        {/* More symbols & notation */}
        <span className="absolute bottom-[35%] left-[8%] font-[Caveat] text-3xl rotate-[-6deg]" style={{ color: '#6a5a7a', opacity: 0.32 }}>
          ∏ᵢ
        </span>
        <span className="absolute top-[50%] left-[52%] font-[Caveat] text-xl rotate-[9deg]" style={{ color: '#7a7a4a', opacity: 0.25 }}>
          ℕ ⊂ ℤ ⊂ ℚ
        </span>
        <span className="absolute bottom-[25%] right-[5%] font-[Caveat] text-xl rotate-[-4deg]" style={{ color: '#4a6a6a', opacity: 0.29 }}>
          |z| = √(a²+b²)
        </span>
        <span className="absolute top-[85%] right-[25%] font-[Caveat] text-2xl rotate-[6deg]" style={{ color: '#6a4a5a', opacity: 0.28 }}>
          n! = n(n-1)!
        </span>
        <span className="absolute bottom-[48%] right-[52%] font-[Caveat] text-xl rotate-[-3deg]" style={{ color: '#5a7a5a', opacity: 0.26 }}>
          log₂8 = 3
        </span>
        
        {/* Golden ratio & special numbers */}
        <span className="absolute top-[15%] left-[38%] font-[Caveat] text-2xl rotate-[4deg]" style={{ color: '#7a6a4a', opacity: 0.30 }}>
          φ = 1.618...
        </span>
        <span className="absolute bottom-[62%] left-[28%] font-[Caveat] text-2xl rotate-[-7deg]" style={{ color: '#4a5a7a', opacity: 0.28 }}>
          √5
        </span>
        <span className="absolute top-[78%] left-[42%] font-[Caveat] text-2xl rotate-[2deg]" style={{ color: '#6a7a4a', opacity: 0.29 }}>
          i² = -1
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
