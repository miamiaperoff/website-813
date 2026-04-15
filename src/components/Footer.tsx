import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-serif text-2xl font-light text-primary-foreground italic mb-4">
          Eight Thirteen
        </p>
        <p className="text-xs tracking-[0.15em] uppercase text-primary-foreground/50 mb-6">
          Café · Coworking · Event Space
        </p>
        <div className="flex justify-center gap-6 text-xs tracking-[0.15em] uppercase text-primary-foreground/60 mb-8">
          <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
          <Link to="/coworking" className="hover:text-primary-foreground transition-colors">Coworking</Link>
          <Link to="/careers" className="hover:text-primary-foreground transition-colors">Careers</Link>
          <a href="https://813cafe.org/order-online" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Order</a>
        </div>
        <div className="w-16 h-px bg-primary-foreground/20 mx-auto mb-6" />
        <p className="text-xs text-primary-foreground/40">
          © 2025 813 Cafe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
