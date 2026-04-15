import logo from '@/assets/eight-thirteen-logo.png';

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-primary">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <img
          src={logo}
          alt="Eight Thirteen"
          className="h-48 md:h-64 lg:h-72 w-auto mx-auto mb-10 animate-fade-in rounded-full"
        />
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-foreground font-light italic leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Café · Coworking · Event Space
        </p>
        <p className="text-sm md:text-base text-primary-foreground/70 mt-6 tracking-widest uppercase animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Ozamiz City
        </p>
        
        <div className="flex gap-6 justify-center mt-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={scrollToMenu}
            className="text-xs tracking-[0.2em] uppercase font-medium text-primary-foreground border border-primary-foreground/40 px-8 py-3 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
          >
            Menus
          </button>
          <a
            href="https://813cafe.org/order-online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase font-medium text-primary-foreground border border-primary-foreground/40 px-8 py-3 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
          >
            Order Online
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/50 animate-float">
        <div className="w-5 h-8 border border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-0.5 h-2.5 bg-primary-foreground/40 rounded-full mt-1.5"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
