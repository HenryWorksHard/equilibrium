export const Thesis = () => {
  return (
    <section className="mt-16 mb-8 max-w-3xl mx-auto">
      {/* Mathematical frame */}
      <div className="relative bg-paper/80 border-2 border-graphLight rounded-lg p-8 shadow-lg">
        
        {/* Corner decorations - like a proof box */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-graphBlue -translate-x-0.5 -translate-y-0.5" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-graphBlue translate-x-0.5 -translate-y-0.5" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-graphBlue -translate-x-0.5 translate-y-0.5" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-graphBlue translate-x-0.5 translate-y-0.5" />

        {/* Theorem header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-graphBlue font-bold mono-text text-sm tracking-wider">THEOREM</span>
          <div className="flex-1 h-px bg-graphLight" />
          <span className="text-ink/30 mono-text text-xs">Balanced Mode</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-serif text-ink mb-6">
          <span className="italic text-graphBlue">E</span>quilibrium Thesis
        </h2>

        {/* The equation - visual centerpiece */}
        <div className="bg-cream/60 border border-graphLight rounded-lg p-4 mb-6 text-center">
          <div className="equation text-xl md:text-2xl text-ink">
            <span className="text-green-600">0.75%</span>
            <span className="text-ink/40 mx-2">→</span>
            <span>LP Depth</span>
            <span className="text-ink/30 mx-4">+</span>
            <span className="text-blue-600">0.25%</span>
            <span className="text-ink/40 mx-2">→</span>
            <span>Creator Rewards</span>
          </div>
          <div className="mt-2 text-ink/40 mono-text text-sm">
            ∴ deeper liquidity = longer life = sustainable ecosystem
          </div>
        </div>

        {/* Proof body */}
        <div className="space-y-4 text-ink/80 leading-relaxed">
          <p className="flex gap-3">
            <span className="text-graphBlue font-bold mono-text shrink-0">§1</span>
            <span>
              <strong className="text-ink">The Problem:</strong> Pump tokens die fast. 
              Shallow liquidity leads to violent dumps, destroying value for traders and creators alike.
            </span>
          </p>

          <p className="flex gap-3">
            <span className="text-graphBlue font-bold mono-text shrink-0">§2</span>
            <span>
              <strong className="text-ink">Balanced Mode:</strong> 0.75% of post-bonding volume compounds into LPs, 
              making pools ~4× deeper. Meanwhile, 0.25% of bonding volume rewards creators every 24 hours—distributed 
              evenly across all successful bonds.
            </span>
          </p>

          <p className="flex gap-3">
            <span className="text-graphBlue font-bold mono-text shrink-0">§3</span>
            <span>
              <strong className="text-ink">Equilibrium:</strong> When traders and deployers both win, 
              the game changes from zero-sum extraction to positive-sum growth. More liquidity attracts 
              more volume. More volume generates more rewards. The flywheel spins.
            </span>
          </p>
        </div>

        {/* QED */}
        <div className="mt-6 pt-4 border-t border-graphLight flex justify-between items-center">
          <span className="mono-text text-xs text-ink/40">
            ∑ aligned incentives → sustainable tokens
          </span>
          <span className="text-xl text-graphBlue">∎</span>
        </div>
      </div>
    </section>
  );
};
