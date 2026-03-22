export const Header = () => {
  return (
    <header className="text-center py-8 relative z-10">
      {/* Main title - mathematical serif style */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-ink">
        <span className="text-graphBlue italic">E</span>
        <span className="text-ink/90">quilibrium</span>
      </h1>
      
      {/* Ecosystem symbol */}
      <div className="mt-8 text-5xl md:text-6xl lg:text-7xl text-ink/40">
        ⇌
      </div>
      
      {/* Subtitle */}
      <p className="mt-8 text-sm md:text-base text-ink/40 mono-text tracking-wider">
        40 coins • drag to compare • find balance
      </p>
    </header>
  );
};
