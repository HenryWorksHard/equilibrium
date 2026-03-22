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
      {/* Sidebar - clean hand-drawn style - 75% reduced from original */}
      <div className="fixed top-1/2 -translate-y-1/2 z-50" style={{ left: '12px' }}>
        <div 
          className="bg-paper relative"
          style={{
            padding: '12px',
            borderRadius: '3px 5px 4px 7px',
            boxShadow: '3px 3px 0 rgba(0,0,0,0.08)',
          }}
        >
          {/* Menu Label at Top - handwritten style */}
          <div className="text-center border-b border-ink/20" style={{ marginBottom: '10px', paddingBottom: '6px', borderStyle: 'dashed' }}>
            <span className="font-[Caveat] text-ink/70 tracking-wide" style={{ fontSize: '1.05rem' }}>menu</span>
          </div>

          <div className="flex flex-col" style={{ gap: '8px' }}>
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
                  padding: '8px 21px',
                  borderRadius: '2px 4px 3px 5px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '1.3rem' }}>X</span>
              </a>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '8px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '6px 10px', fontSize: '1.3rem' }}>
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
                  padding: '8px 21px',
                  borderRadius: '3px 2px 4px 3px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '1.3rem' }}>CA</span>
              </button>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '8px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '6px 10px', fontSize: '1.3rem' }}>
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
                  padding: '8px 21px',
                  borderRadius: '2px 5px 2px 4px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '1.3rem' }}>Thesis</span>
              </button>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '8px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '6px 10px', fontSize: '1.3rem' }}>
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
                  padding: '8px 21px',
                  borderRadius: '4px 3px 5px 2px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                <span className="font-[Caveat] font-bold text-ink group-hover:text-white" style={{ fontSize: '1.3rem' }}>bonk</span>
              </a>
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 
                opacity-0 group-hover/tooltip:opacity-100 pointer-events-none
                transition-opacity duration-200 whitespace-nowrap" style={{ marginLeft: '8px' }}>
                <div className="bg-ink text-white rounded shadow-lg font-[Caveat]" style={{ padding: '6px 10px', fontSize: '1.3rem' }}>
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
              
              <div className="mb-6">
                <p className="font-mono text-sm text-ink/80 break-all select-all leading-relaxed">
                  9Vyp1mH7kJdT61pRY4mAkPvtqdwBJEhpoT5YxGNgbonk
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('9Vyp1mH7kJdT61pRY4mAkPvtqdwBJEhpoT5YxGNgbonk');
                  }}
                  className="mt-4 px-6 py-2 bg-ink/10 hover:bg-ink/20 rounded-full font-[Caveat] text-xl text-ink/70 transition-colors"
                >
                  Copy CA
                </button>
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
