import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

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
            {!user ? (
              <>
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
                <Link 
                  to="/member-portal/login"
                  className="text-white hover:text-warm-accent transition-colors duration-200"
                >
                  Member Portal
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-white hover:text-warm-accent transition-colors duration-200"
                >
                  Home
                </button>
                <Link 
                  to="/member-portal"
                  className="text-white hover:text-warm-accent transition-colors duration-200 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Link>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-white border-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </div>
            )}
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
            {!user ? (
              <Link 
                to="/member-portal/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
              >
                Member Portal
              </Link>
            ) : (
              <>
                <Link 
                  to="/member-portal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-white hover:text-warm-accent transition-colors duration-200 py-2"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;