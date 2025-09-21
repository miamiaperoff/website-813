import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Wifi, Coffee, Shield, Calendar, Printer, Home } from 'lucide-react';

const Coworking = () => {
  return (
    <section id="coworking" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            COWORKING
          </h2>
          <p className="text-lg text-muted-foreground">
            A place where work feels good
          </p>
        </div>

        {/* 813 Club Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-serif text-3xl font-bold text-primary mb-2">813 CLUB</h3>
            <p className="text-lg text-muted-foreground">Membership • Perks • Rules • Our Promise</p>
          </div>

          {/* What You Get */}
          <Card className="p-8 bg-card border-none shadow-warm mb-8">
            <h4 className="font-serif text-2xl font-semibold text-primary mb-6 text-center">What You Get</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">24/7 Coworking Access</h5>
                <p className="text-sm text-muted-foreground">Access whenever you need it</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">Reserved Desk</h5>
                <p className="text-sm text-muted-foreground">Members-Only Hours (8PM-11AM, except Fridays)</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">Open Seating Access</h5>
                <p className="text-sm text-muted-foreground">Outside Members-Only Hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">Fast WiFi & Power</h5>
                <p className="text-sm text-muted-foreground">At every desk</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">1 Free Drink Daily</h5>
                <p className="text-sm text-muted-foreground">Up to ₱150 value</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">Member Events</h5>
                <p className="text-sm text-muted-foreground">Bi-weekly invitations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">Safe & Secure</h5>
                <p className="text-sm text-muted-foreground">Near City Hall, CCTVs</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Printer className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-medium text-foreground mb-2">Printing Available</h5>
                <p className="text-sm text-muted-foreground">On-site printing services</p>
              </div>
            </div>
          </Card>

          {/* Pricing Plans */}
          <Card className="p-8 bg-yellow-50 border-none shadow-warm mb-8">
            <h4 className="font-serif text-2xl font-semibold text-primary mb-6 text-center">PRICING PLANS</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h5 className="font-semibold text-foreground mb-2">Flex Plan</h5>
                <p className="text-sm text-muted-foreground mb-2">Month-to-Month</p>
                <p className="text-2xl font-bold text-primary">₱5,000</p>
                <p className="text-sm text-muted-foreground">/ month</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h5 className="font-semibold text-foreground mb-2">Save Plan</h5>
                <p className="text-sm text-muted-foreground mb-2">3 Months</p>
                <p className="text-2xl font-bold text-primary">₱4,500</p>
                <p className="text-sm text-muted-foreground">/ month</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h5 className="font-semibold text-foreground mb-2">Growth Plan</h5>
                <p className="text-sm text-muted-foreground mb-2">6 Months</p>
                <p className="text-2xl font-bold text-primary">₱4,000</p>
                <p className="text-sm text-muted-foreground">/ month</p>
                <p className="text-xs text-green-600 mt-2">1 guest day pass/week</p>
                <p className="text-xs text-muted-foreground">Quarterly Payment: ₱12,000</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-primary">
                <h5 className="font-semibold text-foreground mb-2">Resident Plan</h5>
                <p className="text-sm text-muted-foreground mb-2">12 Months</p>
                <p className="text-2xl font-bold text-primary">₱3,500</p>
                <p className="text-sm text-muted-foreground">/ month</p>
                <p className="text-xs text-green-600 mt-2">2 guest passes/week</p>
                <p className="text-xs text-green-600">1 meeting room hour/month</p>
                <p className="text-xs text-primary font-medium">Preferred Pricing, limited-time offer</p>
                <p className="text-xs text-muted-foreground">Quarterly Payment: ₱10,500</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">Early Termination Fee: ₱1,500</p>
          </Card>

          {/* Seating Rules */}
          <Card className="p-8 bg-green-800 text-white border-none shadow-warm mb-8">
            <h4 className="font-serif text-2xl font-semibold mb-6 text-center">Seating Rules</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h5 className="font-medium mb-2">Limited to 13 Members</h5>
                <p className="text-sm opacity-90">Ensures comfortable working space for everyone</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h5 className="font-medium mb-2">Members-Only Hours</h5>
                <p className="text-sm opacity-90">8PM-11AM (except Fridays), reserved desks guaranteed</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h5 className="font-medium mb-2">Grace Period</h5>
                <p className="text-sm opacity-90">1 hour if someone occupies your desk, then it reverts to you</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h5 className="font-medium mb-2">Quiet + Calls</h5>
                <p className="text-sm opacity-90">Use headphones; callbox available (reserve via app or first-come, first-served)</p>
              </div>
            </div>
          </Card>

          {/* Access & Verification, Payment & Terms */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-card border-none shadow-warm">
              <h4 className="font-semibold text-foreground mb-4">Access & Verification</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Show QR code for access & daily drink</li>
                <li>• Guests allowed only during open seating with day pass</li>
              </ul>
            </Card>
            
            <Card className="p-6 bg-card border-none shadow-warm">
              <h4 className="font-semibold text-foreground mb-4">Payment & Terms</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monthly billing, auto-renew</li>
                <li>• Prepaid plans: discounted, non-refundable</li>
                <li>• 5-day grace for late payments</li>
                <li>• Non-transferable; individual use only</li>
              </ul>
            </Card>
          </div>

          {/* The 813 Promise */}
          <Card className="p-8 bg-card border-none shadow-warm mb-8">
            <h4 className="font-serif text-2xl font-semibold text-primary mb-4 text-center">The 813 Promise</h4>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-foreground">A place where work feels good.</p>
              <p className="text-muted-foreground">We commit to comfort, calm, fair access, kind service, and continuous improvement.</p>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-yellow-400 text-green-800 hover:bg-yellow-500 font-semibold px-8 py-4 text-lg"
              onClick={() => window.open('https://813cafe.com/coworking', '_blank')}
            >
              Sign Up Today!
            </Button>
            
            <div className="mt-6 p-6 bg-card rounded-lg">
              <h5 className="font-semibold text-foreground mb-2">Contact Ana Calubiran</h5>
              <p className="text-sm text-muted-foreground mb-2">Coworking Space Manager</p>
              <div className="space-y-1 text-sm">
                <p>Phone: <a href="tel:+639709617206" className="text-primary hover:underline">(+63) 9709617206</a></p>
                <p>Email: <a href="mailto:hey@813cafe.com" className="text-primary hover:underline">hey@813cafe.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coworking;
