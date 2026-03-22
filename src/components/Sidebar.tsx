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

      {/* CA Modal - Full page notebook with page turn */}
      {showCA && (
        <div 
          className={`z-[100] ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onClick={() => handleClose(setShowCA)}
        >
          {/* Notebook page */}
          <div 
            className={`relative rounded-lg shadow-2xl overflow-hidden ${isClosing ? 'page-turn-exit' : 'page-turn-enter'}`}
            style={{
              maxWidth: '32rem',
              width: '100%',
              backgroundColor: '#fffef8',
              backgroundImage: `
                linear-gradient(#c8d4e3 1px, transparent 1px),
                linear-gradient(90deg, #c8d4e3 1px, transparent 1px),
                linear-gradient(#dce4ed 0.5px, transparent 0.5px),
                linear-gradient(90deg, #dce4ed 0.5px, transparent 0.5px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red margin line */}
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-red-300/60" />
            
            {/* Hole punches */}
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-400/30" />
            <div className="absolute left-2.5 top-[calc(50%-70px)] w-4 h-4 rounded-full bg-gray-400/30" />
            <div className="absolute left-2.5 top-[calc(50%+70px)] w-4 h-4 rounded-full bg-gray-400/30" />

            {/* Faint math scribbles */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden">
              <div className="absolute top-4 right-8 text-sm italic text-graphBlue rotate-3">∫ f(x)dx</div>
              <div className="absolute bottom-8 right-12 text-xs italic text-graphBlue -rotate-2">E = mc²</div>
              <div className="absolute top-1/3 right-4 text-xs italic text-graphBlue rotate-6">Σᵢ xᵢ</div>
            </div>
            
            {/* Close button styled as X */}
            <button 
              onClick={() => handleClose(setShowCA)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors z-10 
                mono-text text-lg font-bold"
            >
              ✕
            </button>

            {/* Content */}
            <div className="text-center pt-12 pb-16 px-12 pl-16">
              <div className="flex items-center justify-center gap-2 mb-10">
                <span className="mono-text text-sm text-graphBlue tracking-wider font-medium uppercase">Contract Address</span>
              </div>
              
              <div className="mb-10">
                <div className="text-6xl text-ink/15 mb-6">⏳</div>
                <p className="font-serif text-3xl text-ink/70 italic">Coming Soon</p>
                <p className="mono-text text-sm text-ink/40 mt-6">Launch pending...</p>
              </div>

              <div className="text-ink/40 mono-text text-sm pt-6 border-t border-graphLight/50">
                ∴ patience → equilibrium
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thesis Modal - Full page notebook with page turn */}
      {showThesis && (
        <div 
          className={`z-[100] overflow-y-auto ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onClick={() => handleClose(setShowThesis)}
        >
          {/* Notebook page */}
          <div 
            className={`relative rounded-lg shadow-2xl overflow-y-auto ${isClosing ? 'page-turn-exit' : 'page-turn-enter'}`}
            style={{
              maxWidth: '48rem',
              width: '100%',
              maxHeight: '90vh',
              margin: '2rem 0',
              backgroundColor: '#fffef8',
              backgroundImage: `
                linear-gradient(#c8d4e3 1px, transparent 1px),
                linear-gradient(90deg, #c8d4e3 1px, transparent 1px),
                linear-gradient(#dce4ed 0.5px, transparent 0.5px),
                linear-gradient(90deg, #dce4ed 0.5px, transparent 0.5px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red margin line */}
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-red-300/60" />
            
            {/* Hole punches */}
            <div className="absolute left-2.5 top-[80px] w-4 h-4 rounded-full bg-gray-400/30" />
            <div className="absolute left-2.5 top-[180px] w-4 h-4 rounded-full bg-gray-400/30" />
            <div className="absolute left-2.5 top-[280px] w-4 h-4 rounded-full bg-gray-400/30" />

            {/* Faint math scribbles */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] overflow-hidden">
              <div className="absolute top-8 right-12 text-sm italic text-graphBlue rotate-2">∇ × E = -∂B/∂t</div>
              <div className="absolute top-1/4 right-6 text-xs italic text-graphBlue -rotate-3">0.75% + 0.25% = 1%</div>
              <div className="absolute bottom-20 right-8 text-sm italic text-graphBlue rotate-1">∑ rewards</div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => handleClose(setShowThesis)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors z-10
                mono-text text-lg font-bold"
            >
              ✕
            </button>
            
            <div className="p-10 pl-16">
              <Thesis />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
