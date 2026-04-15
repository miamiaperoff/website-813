import logo from '@/assets/eight-thirteen-logo.png';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="813 Cafe barista"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 pb-32 max-w-5xl mx-auto">
        <p className="font-serif text-6xl md:text-7xl lg:text-9xl text-primary-foreground font-light italic leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Work better. Stay longer.<br />Feel good at 813 Café.
        </p>
        <p className="text-base md:text-lg text-primary-foreground/70 mt-8 tracking-widest uppercase animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Ozamiz City
        </p>
        
        <div className="flex gap-6 justify-center mt-14 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={scrollToMenu}
            className="text-sm tracking-[0.2em] uppercase font-medium text-primary-foreground border border-primary-foreground/40 px-12 py-4 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
          >
            What's on the menu
          </button>
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
