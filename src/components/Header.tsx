export const Header = () => {
  return (
    <header className="text-center py-8 relative z-10">
      {/* Main title - mathematical serif style */}
      <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ink">
        <span className="text-graphBlue italic">E</span>
        <span className="text-ink/90">quilibrium</span>
      </h1>
      
      {/* Mathematical equation */}
      <div className="mt-4 text-lg md:text-xl text-ink/50 equation">
        <span className="text-ink/30">[</span>
        <span className="italic"> BONK.fun ecosystem </span>
        <span className="text-ink/30">]</span>
      </div>
      
      {/* Subtitle */}
      <p className="mt-3 text-sm text-ink/40 mono-text tracking-wider">
        compare market caps • find balance
      </p>
      
      {/* Decorative equation line */}
      <div className="mt-6 flex items-center justify-center gap-4 text-ink/25 mono-text text-xs">
        <span>∂L/∂x = 0</span>
        <span className="text-graphBlue/40">•</span>
        <span>equilibrium</span>
        <span className="text-graphBlue/40">•</span>
        <span>d²U/dx² &gt; 0</span>
      </div>
    </header>
  );
};
