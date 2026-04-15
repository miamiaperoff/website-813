import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/eight-thirteen-logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    setIsMobileMenuOpen(false);
  };

  const navTextClass = isScrolled || !isHome
    ? 'text-foreground hover:text-muted-foreground'
    : 'text-primary-foreground hover:text-primary-foreground/70';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-warm py-3'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Main nav row */}
        <div className="flex items-center justify-between relative">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${navTextClass}`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${navTextClass}`}
                >
                  Menus
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${navTextClass}`}
                >
                  Home
                </Link>
                <Link
                  to="/#menu"
                  className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${navTextClass}`}
                >
                  Menus
                </Link>
              </>
            )}
          </div>

          {/* Center logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src={logo}
              alt="Eight Thirteen"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-20 w-20' : 'h-32 w-32'
              } rounded-full`}
            />
          </Link>

          {/* Right nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/coworking"
              className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${navTextClass}`}
            >
              Coworking
            </Link>
            <Link
              to="/careers"
              className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${navTextClass}`}
            >
              Careers
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden transition-colors duration-200 ${navTextClass}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border mt-2">
          <div className="px-6 py-6 space-y-4">
            {isHome ? (
              <>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-muted-foreground py-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="block w-full text-left text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-muted-foreground py-2"
                >
                  Menus
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-muted-foreground py-2"
                >
                  Home
                </Link>
                <Link
                  to="/#menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-muted-foreground py-2"
                >
                  Menus
                </Link>
              </>
            )}
            <Link
              to="/coworking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-muted-foreground py-2"
            >
              Coworking
            </Link>
            <Link
              to="/careers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-muted-foreground py-2"
            >
              Careers
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
