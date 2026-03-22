import { useState } from 'react';
import { Thesis } from './Thesis';

export const Sidebar = () => {
  const [showCA, setShowCA] = useState(false);
  const [showThesis, setShowThesis] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 z-50" style={{ left: '24px' }}>
        <div className="bg-paper border-2 border-graphLight rounded-xl p-4 shadow-lg">
          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-graphBlue" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-graphBlue" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-graphBlue" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-graphBlue" />

          {/* Menu Label at Top */}
          <div className="text-center mb-4 pb-3 border-b border-graphLight">
            <span className="mono-text text-xs text-ink/50 tracking-widest font-medium">MENU</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* X Button */}
            <a
              href="https://x.com/i/communities/2035552239163527656"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3
                bg-cream/60 border border-graphLight rounded-lg
                hover:bg-graphBlue hover:text-white hover:border-graphBlue
                transition-all duration-200 group"
            >
              <span className="mono-text text-base font-bold text-ink group-hover:text-white">X</span>
            </a>

            {/* CA Button */}
            <button
              onClick={() => setShowCA(true)}
              className="flex items-center justify-center px-6 py-3
                bg-cream/60 border border-graphLight rounded-lg
                hover:bg-graphBlue hover:text-white hover:border-graphBlue
                transition-all duration-200 group"
            >
              <span className="mono-text text-base font-bold text-ink group-hover:text-white">CA</span>
            </button>

            {/* Thesis Button */}
            <button
              onClick={() => setShowThesis(true)}
              className="flex items-center justify-center px-6 py-3
                bg-cream/60 border border-graphLight rounded-lg
                hover:bg-graphBlue hover:text-white hover:border-graphBlue
                transition-all duration-200 group"
            >
              <span className="mono-text text-base font-bold text-ink group-hover:text-white">Thesis</span>
            </button>
          </div>
        </div>
      </div>

      {/* CA Modal - Note paper style, CENTERED */}
      {showCA && (
        <div 
          className="z-[100]"
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
          }}
          onClick={() => setShowCA(false)}
        >
          {/* Modal */}
          <div 
            className="relative bg-amber-50 rounded-lg shadow-2xl"
            style={{
              maxWidth: '28rem',
              width: '100%',
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, #c8dae8 27px, #c8dae8 28px)',
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
              onClick={() => setShowCA(false)}
              className="absolute top-3 right-4 w-10 h-10 flex items-center justify-center
                text-gray-400 hover:text-gray-700 transition-colors text-2xl font-light z-10"
            >
              ×
            </button>

            {/* Content */}
            <div className="text-center pt-8 pb-10 px-10 pl-14">
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="mono-text text-sm text-graphBlue tracking-wider font-medium uppercase">Contract Address</span>
              </div>
              
              <div className="mb-8">
                <div className="text-6xl text-ink/20 mb-4">⏳</div>
                <p className="font-serif text-2xl text-ink/70 italic">Coming Soon</p>
                <p className="mono-text text-sm text-ink/40 mt-4">Launch pending...</p>
              </div>

              <div className="text-ink/40 mono-text text-sm pt-4 border-t border-graphLight/30">
                ∴ patience → equilibrium
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thesis Modal - Note paper style, CENTERED */}
      {showThesis && (
        <div 
          className="z-[100] overflow-y-auto"
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
          }}
          onClick={() => setShowThesis(false)}
        >
          {/* Modal */}
          <div 
            className="relative bg-amber-50 rounded-lg shadow-2xl overflow-y-auto"
            style={{
              maxWidth: '42rem',
              width: '100%',
              maxHeight: '90vh',
              margin: '2rem 0',
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, #c8dae8 27px, #c8dae8 28px)',
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
              onClick={() => setShowThesis(false)}
              className="absolute top-3 right-4 w-10 h-10 flex items-center justify-center
                text-gray-400 hover:text-gray-700 transition-colors text-2xl font-light z-10"
            >
              ×
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
