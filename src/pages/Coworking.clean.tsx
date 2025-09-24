import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Coffee, Users, Clock, MapPin, CheckCircle, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation.clean';
import Footer from '@/components/Footer';

const Coworking = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-primary/90" />
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Badge className="mb-4 bg-warm-accent text-primary font-medium px-4 py-2">
              813 CLUB
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              A Place Where Work Feels Good
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join our exclusive community of 13 members. Experience comfort, calm, fair access, 
              and kind service in our premium coworking space.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-warm-accent hover:bg-warm-accent/90 text-primary font-medium px-8 py-4 rounded-full shadow-accent transition-all duration-300 hover:scale-105 text-lg"
            >
              Sign Up Today
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

      {/* Features Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              What You Get
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exclusive perks and amenities designed for our 13-member community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">24/7 Coworking Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Round-the-clock access to our premium coworking space.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-warm-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-warm-accent" />
                </div>
                <CardTitle className="text-xl">Reserved Desk</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Reserved desk during Members-Only Hours (8PM-11AM, except Fridays).
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Open Seating</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Open seating access outside Members-Only Hours.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-warm-accent/20 rounded-full flex items-center justify-center">
                  <Wifi className="w-8 h-8 text-warm-accent" />
                </div>
                <CardTitle className="text-xl">Fast WiFi & Power</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Fast WiFi and power outlets at every desk.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Daily Free Drink</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  1 free drink per day (up to ₱150) to fuel your productivity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-warm-accent/20 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-warm-accent" />
                </div>
                <CardTitle className="text-xl">Member Events</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Invitations to bi-weekly member events and networking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Safe and secure location near City Hall with CCTV monitoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-warm transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-warm-accent/20 rounded-full flex items-center justify-center">
                  <div className="text-2xl">🖨️</div>
                </div>
                <CardTitle className="text-xl">Printing Available</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  On-site printing and scanning services for your business needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Join 813 CLUB?
          </h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            Ready to join our exclusive community of 13 members? Contact Ana Calubiran to start your membership process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          </div>
          <div className="text-white/90">
            <p className="text-lg font-medium mb-2">Contact Ana Calubiran</p>
            <p className="text-base mb-2">Coworking Space Manager</p>
            <p className="text-base">
              <a href="tel:+639709617206" className="text-white hover:text-warm-accent transition-colors">
                (+63) 9709617206
              </a>
              {' • '}
              <a href="mailto:hey@813cafe.com" className="text-white hover:text-warm-accent transition-colors">
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
