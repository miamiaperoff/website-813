import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Visit Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're located right by City Hall, at the corner of Hon. Atty. Wilfredo Chiong Street and City Hall Drive.
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
            
            {/* Instagram Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/6fb5e738-39ab-438e-80aa-8c990abb3866.png" 
                  alt="Working at 813 Cafe with iced coffee"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/f14be507-5ba4-4f71-87e4-c2943549abcf.png" 
                  alt="813 Cafe interior with coworking space"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/e9b661e6-257a-4eac-afb1-3eb063488565.png" 
                  alt="Delicious food at 813 Cafe including bacalao"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              <Button 
                variant="outline"
                className="rounded-full w-20 h-20 border-2 border-primary hover:bg-primary hover:text-primary-foreground p-1"
                onClick={() => window.open('https://web.facebook.com/profile.php?id=61579389969937', '_blank')}
              >
                <FaFacebook className="w-16 h-16" />
              </Button>
              <Button 
                variant="outline"
                className="rounded-full w-20 h-20 border-2 border-primary hover:bg-primary hover:text-primary-foreground p-1"
                onClick={() => window.open('https://www.instagram.com/813.cafe', '_blank')}
              >
                <FaInstagram className="w-16 h-16" />
              </Button>
              <Button 
                variant="outline"
                className="rounded-full w-20 h-20 border-2 border-primary hover:bg-primary hover:text-primary-foreground p-1"
                onClick={() => window.open('https://www.tiktok.com/@813_cafe', '_blank')}
              >
                <FaTiktok className="w-16 h-16" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;