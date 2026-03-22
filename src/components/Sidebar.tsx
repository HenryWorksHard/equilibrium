import { useState } from 'react';
import { Thesis } from './Thesis';

export const Sidebar = () => {
  const [showCA, setShowCA] = useState(false);
  const [showThesis, setShowThesis] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (setter: (val: boolean) => void) => {
    setIsClosing(true);
    setTimeout(() => {
      setter(false);
      setIsClosing(false);
    }, 400);
  };

  return (
    <>
      {/* SVG filter for hand-drawn wavy effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="squiggly">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>

      {/* Sidebar - hand-drawn notebook style */}
      <div className="fixed top-1/2 -translate-y-1/2 z-50" style={{ left: '24px' }}>
        <div 
          className="bg-paper border-[3px] border-ink/50 p-5 shadow-lg relative"
          style={{
            boxShadow: '4px 4px 0 rgba(0,0,0,0.12), -1px -1px 0 rgba(0,0,0,0.05)',
            borderRadius: '4px 8px 4px 6px',
            filter: 'url(#squiggly)',
          }}
        >
          {/* Menu Label at Top - handwritten style */}
          <div className="text-center mb-5 pb-4 border-b-2 border-ink/25 border-dashed">
            <span className="font-[Caveat] text-xl text-ink/70 tracking-wide">menu</span>
          </div>

          <div className="flex flex-col gap-4">
            {/* X Button - handwritten */}
            <div className="relative group/tooltip">
              <a
                href="https://x.com/i/communities/2035552239163527656"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-3
                  bg-cream/40 border-[3px] border-ink/35
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                  borderRadius: '3px 5px 4px 6px',
                }}
              >
                <span className="font-[Caveat] text-2xl font-semibold text-ink group-hover:text-white">X</span>
              </a>
              {/* Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap">
                <div className="bg-ink text-white px-4 py-2 rounded shadow-lg font-[Caveat] text-xl">
                  Join Community
                </div>
              </div>
            </div>

            {/* CA Button - handwritten */}
            <div className="relative group/tooltip">
              <button
                onClick={() => setShowCA(true)}
                className="w-full flex items-center justify-center px-8 py-3
                  bg-cream/40 border-[3px] border-ink/35
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                  borderRadius: '4px 3px 5px 4px',
                }}
              >
                <span className="font-[Caveat] text-2xl font-semibold text-ink group-hover:text-white">CA</span>
              </button>
              {/* Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap">
                <div className="bg-ink text-white px-4 py-2 rounded shadow-lg font-[Caveat] text-xl">
                  Contract Address
                </div>
              </div>
            </div>

            {/* Thesis Button - handwritten */}
            <div className="relative group/tooltip">
              <button
                onClick={() => setShowThesis(true)}
                className="w-full flex items-center justify-center px-8 py-3
                  bg-cream/40 border-[3px] border-ink/35
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                  borderRadius: '5px 4px 3px 5px',
                }}
              >
                <span className="font-[Caveat] text-2xl font-semibold text-ink group-hover:text-white">Thesis</span>
              </button>
              {/* Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap">
                <div className="bg-ink text-white px-4 py-2 rounded shadow-lg font-[Caveat] text-xl">
                  How It Works
                </div>
              </div>
            </div>

            {/* Bonk Button - handwritten */}
            <div className="relative group/tooltip">
              <a
                href="https://bonk.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-3
                  bg-cream/40 border-[3px] border-ink/35
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                  borderRadius: '3px 6px 4px 3px',
                }}
              >
                <span className="font-[Caveat] text-2xl font-semibold text-ink group-hover:text-white">bonk</span>
              </a>
              {/* Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap">
                <div className="bg-ink text-white px-4 py-2 rounded shadow-lg font-[Caveat] text-xl">
                  bonk.fun
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CA Modal - Full page flip */}
      {showCA && (
        <div 
          className={`z-[100] ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            perspective: '2000px',
          }}
          onClick={() => handleClose(setShowCA)}
        >
          {/* Full-page notebook that flips */}
          <div 
            className={`absolute inset-0 ${isClosing ? 'full-page-turn-exit' : 'full-page-turn-enter'}`}
            style={{
              backgroundColor: '#fffef8',
              backgroundImage: `
                linear-gradient(#c8d4e3 1px, transparent 1px),
                linear-gradient(90deg, #c8d4e3 1px, transparent 1px),
                linear-gradient(#dce4ed 0.5px, transparent 0.5px),
                linear-gradient(90deg, #dce4ed 0.5px, transparent 0.5px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
              transformOrigin: 'left center',
              boxShadow: '10px 0 40px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red margin line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300/60" />
            
            {/* Hole punches down the left */}
            <div className="absolute left-6 top-[15%] w-5 h-5 rounded-full bg-gray-400/30" />
            <div className="absolute left-6 top-[35%] w-5 h-5 rounded-full bg-gray-400/30" />
            <div className="absolute left-6 top-[55%] w-5 h-5 rounded-full bg-gray-400/30" />
            <div className="absolute left-6 top-[75%] w-5 h-5 rounded-full bg-gray-400/30" />

            {/* Faint math scribbles */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden font-[Caveat]">
              <div className="absolute top-[10%] right-[15%] text-2xl text-[#6a8aaa] rotate-3">∫ f(x)dx</div>
              <div className="absolute bottom-[20%] right-[20%] text-xl text-[#8a6a6a] -rotate-2">E = mc²</div>
              <div className="absolute top-[30%] right-[8%] text-xl text-[#6a7a8a] rotate-6">Σᵢ xᵢ</div>
              <div className="absolute bottom-[40%] left-[25%] text-xl text-[#7a8a6a] -rotate-4">a² + b² = c²</div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => handleClose(setShowCA)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors z-10 
                font-[Caveat] text-3xl"
            >
              ✕
            </button>

            {/* Content - centered on page */}
            <div className="absolute inset-0 flex items-center justify-center pl-20">
              <div className="text-center max-w-lg">
                <div className="flex items-center justify-center gap-2 mb-12">
                  <span className="font-[Caveat] text-3xl text-ink/70 tracking-wide">Contract Address</span>
                </div>
                
                <div className="mb-12">
                  <div className="text-8xl text-ink/15 mb-8">⏳</div>
                  <p className="font-[Caveat] text-5xl text-ink/70">Coming Soon</p>
                  <p className="font-[Caveat] text-xl text-ink/40 mt-8">Launch pending...</p>
                </div>

                <div className="text-ink/40 font-[Caveat] text-xl pt-8 border-t-2 border-dashed border-ink/20">
                  ∴ patience → equilibrium
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thesis Modal - Full page flip */}
      {showThesis && (
        <div 
          className={`z-[100] ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            perspective: '2000px',
          }}
          onClick={() => handleClose(setShowThesis)}
        >
          {/* Full-page notebook that flips */}
          <div 
            className={`absolute inset-0 overflow-y-auto ${isClosing ? 'full-page-turn-exit' : 'full-page-turn-enter'}`}
            style={{
              backgroundColor: '#fffef8',
              backgroundImage: `
                linear-gradient(#c8d4e3 1px, transparent 1px),
                linear-gradient(90deg, #c8d4e3 1px, transparent 1px),
                linear-gradient(#dce4ed 0.5px, transparent 0.5px),
                linear-gradient(90deg, #dce4ed 0.5px, transparent 0.5px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
              transformOrigin: 'left center',
              boxShadow: '10px 0 40px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red margin line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300/60" style={{ position: 'fixed' }} />
            
            {/* Hole punches down the left */}
            <div className="fixed left-6 top-[15%] w-5 h-5 rounded-full bg-gray-400/30" />
            <div className="fixed left-6 top-[35%] w-5 h-5 rounded-full bg-gray-400/30" />
            <div className="fixed left-6 top-[55%] w-5 h-5 rounded-full bg-gray-400/30" />
            <div className="fixed left-6 top-[75%] w-5 h-5 rounded-full bg-gray-400/30" />

            {/* Faint math scribbles */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.06] overflow-hidden font-[Caveat]">
              <div className="absolute top-[8%] right-[12%] text-2xl text-[#6a8aaa] rotate-2">∇ × E = -∂B/∂t</div>
              <div className="absolute top-[25%] right-[5%] text-xl text-[#8a6a6a] -rotate-3">0.75% + 0.25% = 1%</div>
              <div className="absolute bottom-[15%] right-[18%] text-xl text-[#6a7a8a] rotate-1">∑ rewards</div>
              <div className="absolute bottom-[30%] left-[22%] text-xl text-[#7a8a6a] rotate-4">A = πr²</div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => handleClose(setShowThesis)}
              className="fixed top-8 right-8 w-12 h-12 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors z-10
                font-[Caveat] text-3xl"
            >
              ✕
            </button>
            
            {/* Content with proper margins */}
            <div className="py-16 px-20 pl-24 max-w-4xl mx-auto">
              <Thesis />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
