import { useState } from 'react';
import { Thesis } from './Thesis';

export const Sidebar = () => {
  const [showCA, setShowCA] = useState(false);
  const [showThesis, setShowThesis] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
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
          className="fixed inset-0 bg-ink/30 z-[100] flex items-center justify-center"
          onClick={() => setShowCA(false)}
        >
          <div 
            className="bg-paper border-2 border-graphLight rounded-xl p-10 max-w-md w-full shadow-2xl relative graph-paper-modal m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-graphBlue" />
            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-graphBlue" />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-graphBlue" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-graphBlue" />

            {/* Close button */}
            <button 
              onClick={() => setShowCA(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors text-2xl"
            >
              ×
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="mono-text text-sm text-graphBlue tracking-wider font-medium">CONTRACT ADDRESS</span>
              </div>
              
              <div className="bg-cream/60 border border-graphLight rounded-lg p-8 mb-6">
                <div className="text-5xl text-ink/20 mb-3">⏳</div>
                <p className="mono-text text-xl text-ink/60">Coming Soon</p>
                <p className="mono-text text-sm text-ink/40 mt-3">Launch pending...</p>
              </div>

              <div className="text-ink/40 mono-text text-sm">
                ∴ patience → equilibrium
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thesis Modal - Note paper style, CENTERED */}
      {showThesis && (
        <div 
          className="fixed inset-0 bg-ink/30 z-[100] flex items-center justify-center overflow-y-auto"
          onClick={() => setShowThesis(false)}
        >
          <div 
            className="bg-paper border-2 border-graphLight rounded-xl p-8 max-w-2xl w-full shadow-2xl relative graph-paper-modal m-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-graphBlue" />
            <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-graphBlue" />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-graphBlue" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-graphBlue" />

            {/* Close button */}
            <button 
              onClick={() => setShowThesis(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors text-2xl"
            >
              ×
            </button>
            
            <Thesis />
          </div>
        </div>
      )}
    </>
  );
};
