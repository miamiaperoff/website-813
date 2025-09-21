import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-sm shadow-warm' 
        : 'bg-primary/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/33fb7cc1-5128-4c8c-a81f-9658f1523f1a.png" 
              alt="Eight Thirteen Cafe Logo" 
              className="h-10 w-10"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-warm-accent transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-warm-accent transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="text-white hover:text-warm-accent transition-colors duration-200"
            >
              Menu
            </button>
            <Link 
              to="/coworking"
              className="text-white hover:text-warm-accent transition-colors duration-200"
            >
              Coworking
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-warm-accent transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-warm-accent transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => {
                scrollToSection('home');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
            >
              Home
            </button>
            <button 
              onClick={() => {
                scrollToSection('about');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
            >
              About
            </button>
            <button 
              onClick={() => {
                scrollToSection('menu');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
            >
              Menu
            </button>
            <Link 
              to="/coworking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
            >
              Coworking
            </Link>
            <button 
              onClick={() => {
                scrollToSection('contact');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
