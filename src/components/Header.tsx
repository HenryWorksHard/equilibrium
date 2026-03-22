export const Header = () => {
  return (
    <header className="text-center py-12 relative z-10">
      {/* Main title - mathematical serif style */}
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-ink">
        <span className="text-graphBlue italic">E</span>
        <span className="text-ink/90">quilibrium</span>
      </h1>
      
      {/* Ecosystem symbol */}
      <div className="mt-10 text-6xl md:text-7xl lg:text-8xl text-ink/40">
        ⇌
      </div>
      
      {/* Subtitle */}
      <p className="mt-10 text-base md:text-lg text-ink/40 mono-text tracking-wider">
        40 coins • drag to compare • find balance
      </p>
    </header>
  );
};
