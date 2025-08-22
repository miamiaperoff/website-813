import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Visit Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Come experience the warmth and charm that makes our cafe special. 
            We can't wait to welcome you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card className="p-8 bg-card border-none shadow-warm">
            <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
              Location & Hours
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Address</h4>
                <p className="text-muted-foreground">
                  G/F City Park Ave Bldg, City Hall Drive<br />
                  Ozamiz, Philippines
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Hours</h4>
                <div className="text-muted-foreground space-y-1">
                  <p className="font-medium text-primary">24/7 Starting on August 31, 2025</p>
                  <p>Temporary Hours: 7am - 8pm Daily</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Contact</h4>
                <div className="text-muted-foreground space-y-1">
                  <p>Email: hey@813cafe.com</p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="text-center">
            <div className="mb-8">
              <h3 className="font-serif text-3xl font-semibold text-primary mb-4">
                Follow Us @813.cafe
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Stay updated with our latest happenings, daily specials, and community events.
              </p>
            </div>
            
            {/* Instagram Grid Placeholder */}
            <div className="grid grid-cols-3 gap-2 mb-8 max-w-md mx-auto">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-warm-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-warm-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-warm-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-warm-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-warm-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍰</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-warm-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://www.instagram.com/813.cafe', '_blank')}
            >
              View on Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;