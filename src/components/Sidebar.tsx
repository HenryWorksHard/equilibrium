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
      {/* Sidebar - clean hand-drawn style with clear text */}
      <div className="fixed top-1/2 -translate-y-1/2 z-50" style={{ left: '30px' }}>
        <div 
          className="bg-paper relative"
          style={{
            padding: '32px',
            borderRadius: '8px 14px 10px 18px',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.08)',
          }}
        >
          {/* Menu Label at Top - handwritten style */}
          <div className="text-center border-b-2 border-ink/20" style={{ marginBottom: '28px', paddingBottom: '16px', borderStyle: 'dashed' }}>
            <span className="font-[Caveat] text-ink/70 tracking-wide" style={{ fontSize: '2.8rem' }}>menu</span>
          </div>

          <div className="flex flex-col" style={{ gap: '20px' }}>
            {/* X Button - clear with hand-drawn feel */}
            <div className="relative group/tooltip">
              <a
                href="https://x.com/i/communities/2035552239163527656"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-cream/40 border-ink/30
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  padding: '20px 56px',
                  borderRadius: '6px 10px 7px 12px',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '3.5rem' }}>X</span>
              </a>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '20px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '10px 18px', fontSize: '1.5rem' }}>
                  Join Community
                </div>
              </div>
            </div>

            {/* CA Button */}
            <div className="relative group/tooltip">
              <button
                onClick={() => setShowCA(true)}
                className="w-full flex items-center justify-center bg-cream/40 border-ink/30
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  padding: '20px 56px',
                  borderRadius: '7px 6px 10px 7px',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '3.5rem' }}>CA</span>
              </button>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '20px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '10px 18px', fontSize: '1.5rem' }}>
                  Contract Address
                </div>
              </div>
            </div>

            {/* Thesis Button */}
            <div className="relative group/tooltip">
              <button
                onClick={() => setShowThesis(true)}
                className="w-full flex items-center justify-center bg-cream/40 border-ink/30
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  padding: '20px 56px',
                  borderRadius: '6px 12px 5px 10px',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '3.5rem' }}>Thesis</span>
              </button>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '20px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '10px 18px', fontSize: '1.5rem' }}>
                  How It Works
                </div>
              </div>
            </div>

            {/* Bonk Button */}
            <div className="relative group/tooltip">
              <a
                href="https://bonk.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-cream/40 border-ink/30
                  hover:bg-ink hover:border-ink
                  transition-all duration-200 group"
                style={{ 
                  padding: '20px 56px',
                  borderRadius: '10px 7px 12px 5px',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '3.5rem' }}>bonk</span>
              </a>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '20px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '10px 18px', fontSize: '1.5rem' }}>
                  bonk.fun
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CA Modal - Centered card */}
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
            backgroundColor: 'rgba(0,0,0,0.4)',
            perspective: '1200px',
          }}
          onClick={() => handleClose(setShowCA)}
        >
          {/* Modal card */}
          <div 
            className={`relative rounded-lg shadow-2xl ${isClosing ? 'page-turn-exit' : 'page-turn-enter'}`}
            style={{
              maxWidth: '28rem',
              width: '100%',
              backgroundColor: '#faf8f5',
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, #c8dae8 27px, #c8dae8 28px)',
              borderRadius: '4px 8px 6px 10px',
              transformStyle: 'preserve-3d',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red margin line */}
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-red-300/60" />
            
            {/* Hole punches */}
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-300/30" />
            <div className="absolute left-2.5 top-[calc(50%-70px)] w-4 h-4 rounded-full bg-gray-300/30" />
            <div className="absolute left-2.5 top-[calc(50%+70px)] w-4 h-4 rounded-full bg-gray-300/30" />
            
            {/* Close button */}
            <button 
              onClick={() => handleClose(setShowCA)}
              className="absolute top-3 right-4 w-10 h-10 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors font-[Caveat] text-3xl z-10"
            >
              ✕
            </button>

            {/* Content */}
            <div className="text-center pt-8 pb-10 px-10 pl-14">
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="font-[Caveat] text-2xl text-ink/70 tracking-wide">Contract Address</span>
              </div>
              
              <div className="mb-8">
                <div className="text-6xl text-ink/20 mb-4">⏳</div>
                <p className="font-[Caveat] text-4xl text-ink/70">Coming Soon</p>
                <p className="font-[Caveat] text-lg text-ink/40 mt-4">Launch pending...</p>
              </div>

              <div className="text-ink/40 font-[Caveat] text-lg pt-4 border-t border-dashed border-ink/20">
                ∴ patience → equilibrium
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thesis Modal - Centered card */}
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
            backgroundColor: 'rgba(0,0,0,0.4)',
            perspective: '1200px',
          }}
          onClick={() => handleClose(setShowThesis)}
        >
          {/* Modal card */}
          <div 
            className={`relative rounded-lg shadow-2xl overflow-y-auto ${isClosing ? 'page-turn-exit' : 'page-turn-enter'}`}
            style={{
              maxWidth: '42rem',
              width: '100%',
              maxHeight: '90vh',
              margin: '2rem 0',
              backgroundColor: '#faf8f5',
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, #c8dae8 27px, #c8dae8 28px)',
              borderRadius: '4px 8px 6px 10px',
              transformStyle: 'preserve-3d',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red margin line */}
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-red-300/60" />
            
            {/* Hole punches */}
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-300/30" />
            <div className="absolute left-2.5 top-[calc(50%-70px)] w-4 h-4 rounded-full bg-gray-300/30" />
            <div className="absolute left-2.5 top-[calc(50%+70px)] w-4 h-4 rounded-full bg-gray-300/30" />
            
            {/* Close button */}
            <button 
              onClick={() => handleClose(setShowThesis)}
              className="absolute top-3 right-4 w-10 h-10 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors font-[Caveat] text-3xl z-10"
            >
              ✕
            </button>
            
            <div className="p-8 pl-14">
              <Thesis />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
