import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
        : 'bg-transparent'
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
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile"
                  className="text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
                <Link 
                  to="/membership"
                  className="bg-primary text-primary-foreground hover:bg-coffee-dark px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Member Portal
                </Link>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/auth"
                  className="text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
                <Link 
                  to="/membership"
                  className="bg-primary text-primary-foreground hover:bg-coffee-dark px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;