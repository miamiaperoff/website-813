import { Button } from '@/components/ui/button';
import heroImage from '@/assets/cafe-hero.jpg';

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-primary" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <img 
            src="/lovable-uploads/b5915cf5-79c3-44c9-8158-de5a8d709a90.png" 
            alt="Eight Thirteen Cafe Logo" 
            className="h-64 md:h-80 lg:h-96 w-auto mx-auto"
          />
        </div>
        <div className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="mb-2">Café • Coworking • Event Space</p>
          <p className="font-medium">Work Feels Good Here</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={scrollToMenu}
            size="lg"
            className="bg-warm-accent hover:bg-warm-accent/90 text-white font-medium px-8 py-3 rounded-full shadow-accent transition-all duration-300 hover:scale-105"
          >
            Explore Our Menu
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium px-8 py-3 rounded-full transition-all duration-300"
          >
            Visit Us Today
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-float">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;