import { useState } from 'react';
import { Thesis } from './Thesis';

export const Sidebar = () => {
  const [showCA, setShowCA] = useState(false);
  const [showThesis, setShowThesis] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-paper/95 border-2 border-graphLight rounded-lg p-2 shadow-lg backdrop-blur-sm">
          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-graphBlue" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-graphBlue" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-graphBlue" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-graphBlue" />

          <div className="flex flex-col gap-2">
            {/* X Button */}
            <a
              href="https://x.com/i/communities/2035552239163527656"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center
                bg-cream/60 border border-graphLight rounded-lg
                hover:bg-graphBlue hover:text-white hover:border-graphBlue
                transition-all duration-200 group"
              title="Twitter/X"
            >
              <span className="text-xl font-bold text-ink group-hover:text-white">𝕏</span>
            </a>

            {/* Divider */}
            <div className="h-px bg-graphLight mx-1" />

            {/* CA Button */}
            <button
              onClick={() => setShowCA(true)}
              className="w-12 h-12 flex items-center justify-center
                bg-cream/60 border border-graphLight rounded-lg
                hover:bg-graphBlue hover:text-white hover:border-graphBlue
                transition-all duration-200 group"
              title="Contract Address"
            >
              <span className="mono-text text-sm font-bold text-ink group-hover:text-white">CA</span>
            </button>

            {/* Divider */}
            <div className="h-px bg-graphLight mx-1" />

            {/* Thesis Button */}
            <button
              onClick={() => setShowThesis(true)}
              className="w-12 h-12 flex items-center justify-center
                bg-cream/60 border border-graphLight rounded-lg
                hover:bg-graphBlue hover:text-white hover:border-graphBlue
                transition-all duration-200 group"
              title="Thesis"
            >
              <span className="text-xl italic font-serif text-graphBlue group-hover:text-white">∑</span>
            </button>
          </div>

          {/* Label */}
          <div className="mt-2 text-center">
            <span className="mono-text text-[8px] text-ink/30 tracking-widest">MENU</span>
          </div>
        </div>
      </div>

      {/* CA Modal */}
      {showCA && (
        <div 
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowCA(false)}
        >
          <div 
            className="bg-paper border-2 border-graphLight rounded-lg p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-graphBlue" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-graphBlue" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-graphBlue" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-graphBlue" />

            {/* Close button */}
            <button 
              onClick={() => setShowCA(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                text-ink/40 hover:text-ink transition-colors"
            >
              ×
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="mono-text text-sm text-graphBlue tracking-wider">CONTRACT ADDRESS</span>
              </div>
              
              <div className="bg-cream/60 border border-graphLight rounded-lg p-6 mb-4">
                <div className="text-4xl text-ink/20 mb-2">⏳</div>
                <p className="mono-text text-lg text-ink/60">Coming Soon</p>
                <p className="mono-text text-xs text-ink/40 mt-2">Launch pending...</p>
              </div>

              <div className="text-ink/40 mono-text text-xs">
                ∴ patience → equilibrium
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thesis Modal */}
      {showThesis && (
        <div 
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowThesis(false)}
        >
          <div 
            className="my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button floating */}
            <button 
              onClick={() => setShowThesis(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                bg-paper border-2 border-graphLight rounded-full
                text-ink/60 hover:text-ink hover:border-graphBlue transition-all text-xl z-10"
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
