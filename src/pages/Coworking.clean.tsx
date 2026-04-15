import { Wifi, Coffee, Users, Clock, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation.clean';
import Footer from '@/components/Footer';

const Coworking = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary">
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-6 animate-fade-in">
            813 Club
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground italic leading-tight mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            A Place Where<br />Work Feels Good
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/70 max-w-xl mx-auto leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join our exclusive community of 13 members. Experience comfort, calm, fair access, and kind service in our premium coworking space.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a
              href="#contact"
              className="text-xs tracking-[0.2em] uppercase font-medium text-primary-foreground border border-primary-foreground/40 px-8 py-3 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              Sign Up
            </a>
            <Link
              to="/auth"
              className="text-xs tracking-[0.2em] uppercase font-medium text-primary-foreground border border-primary-foreground/40 px-8 py-3 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              Log In
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/50 animate-float">
          <div className="w-5 h-8 border border-primary-foreground/30 rounded-full flex justify-center">
            <div className="w-0.5 h-2.5 bg-primary-foreground/40 rounded-full mt-1.5"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground italic mb-4">
              What You Get
            </h2>
            <div className="w-16 h-px bg-foreground/20 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { icon: Clock, title: '24/7 Access', desc: 'Round-the-clock access to our premium coworking space.' },
              { icon: Users, title: 'Reserved Desk', desc: 'Reserved desk during Members-Only Hours (8PM–11AM, except Fridays).' },
              { icon: Wifi, title: 'Fast WiFi & Power', desc: 'Starlink-powered high-speed internet and power outlets at every desk.' },
              { icon: Coffee, title: 'Daily Free Drink', desc: '1 free drink per day (up to ₱150) to fuel your productivity.' },
              { icon: Zap, title: 'Member Events', desc: 'Invitations to bi-weekly member events and networking.' },
              { icon: Heart, title: 'Safe & Secure', desc: 'Secure location near City Hall with CCTV monitoring and printing services.' },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 border border-border flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-primary-foreground italic mb-6">
            Ready to Join?
          </h2>
          <p className="text-sm text-primary-foreground/70 mb-8 leading-relaxed max-w-lg mx-auto">
            Contact Ana Calubiran to start your membership process.
          </p>
          <div className="space-y-2 text-sm text-primary-foreground/80">
            <p className="font-medium text-primary-foreground">Ana Calubiran</p>
            <p>Coworking Space Manager</p>
            <p>
              <a href="tel:+639709617206" className="hover:text-primary-foreground transition-colors">
                (+63) 9709617206
              </a>
              {' · '}
              <a href="mailto:hey@813cafe.com" className="hover:text-primary-foreground transition-colors">
                hey@813cafe.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Coworking;
