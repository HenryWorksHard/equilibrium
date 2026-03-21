export const Header = () => {
  return (
    <header className="text-center py-12">
      {/* Main title - equation style */}
      <h1 className="text-4xl md:text-6xl font-mono font-light tracking-tight chalk-text">
        <span className="text-accent">E</span>
        <span className="text-chalk/80">quilibrium</span>
      </h1>
      
      {/* Mathematical equation */}
      <div className="mt-6 font-mono text-lg md:text-xl text-chalk/60 equation">
        <span className="text-chalk/40">[</span>
        <span> buyback </span>
        <span className="text-accent mx-2">=</span>
        <span> liquidity </span>
        <span className="text-chalk/40">]</span>
      </div>
      
      {/* Subtitle */}
      <p className="mt-4 text-sm text-chalk/40 font-mono tracking-wider">
        balance the scale. find equilibrium.
      </p>
      
      {/* Decorative equation line */}
      <div className="mt-8 flex items-center justify-center gap-4 text-chalk/20 font-mono text-xs">
        <span>d/dt(system)</span>
        <span>=</span>
        <span>0</span>
        <span className="mx-4">|</span>
        <span>forces = 0</span>
        <span className="mx-4">|</span>
        <span>stability</span>
      </div>
    </header>
  );
};
