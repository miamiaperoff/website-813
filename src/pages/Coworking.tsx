import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Coffee, Users, Clock, MapPin, CheckCircle, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
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
            <Button 
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-full transition-all duration-300 text-lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Pricing Plans
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include 24/7 access and daily free drink.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Flex Plan */}
            <Card className="relative hover:shadow-warm transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">Flex Plan</CardTitle>
                <CardDescription className="text-sm">Month-to-Month</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">₱5,000</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>24/7 coworking access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Reserved desk (8PM-11AM)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>1 free drink/day (up to ₱150)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Fast WiFi & power</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full mt-6" variant="outline">
                    Sign Up Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Save Plan */}
            <Card className="relative hover:shadow-warm transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">Save Plan</CardTitle>
                <CardDescription className="text-sm">3 Months</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">₱4,500</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>24/7 coworking access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Reserved desk (8PM-11AM)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>1 free drink/day (up to ₱150)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Fast WiFi & power</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Bi-weekly member events</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full mt-6" variant="outline">
                    Sign Up Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Growth Plan */}
            <Card className="relative hover:shadow-warm transition-all duration-300 border-primary border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">Growth Plan</CardTitle>
                <CardDescription className="text-sm">6 Months</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">₱4,000</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Quarterly Payment: ₱12,000
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>24/7 coworking access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Reserved desk (8PM-11AM)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>1 free drink/day (up to ₱150)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Fast WiFi & power</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>1 guest day pass/week</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Bi-weekly member events</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                    Sign Up Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Resident Plan */}
            <Card className="relative hover:shadow-warm transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-warm-accent text-primary px-4 py-1">
                  Best Value
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">Resident Plan</CardTitle>
                <CardDescription className="text-sm">12 Months</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">₱3,500</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Quarterly Payment: ₱10,500
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>24/7 coworking access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Reserved desk (8PM-11AM)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>1 free drink/day (up to ₱150)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Fast WiFi & power</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>2 guest passes/week</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>1 meeting room hour/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span>Bi-weekly member events</span>
                  </li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full mt-6" variant="outline">
                    Sign Up Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-primary mb-2">Payment & Terms</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>Monthly billing, auto-renew</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>Prepaid plans: discounted, non-refundable</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>5-day grace for late payments</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>Non-transferable; individual use only</span>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Early Termination Fee: ₱1,500
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rules & Guidelines Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Seating Rules
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our community guidelines ensure a comfortable and productive environment for all 13 members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-warm transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center text-lg font-serif text-primary">Limited Members</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Limited to 13 members to ensure a comfortable working space for everyone.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-warm transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-warm-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-warm-accent" />
                </div>
                <CardTitle className="text-center text-lg font-serif text-primary">Members-Only Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">8PM-11AM (except Fridays), reserved desks guaranteed.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-warm transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-lg font-bold text-primary">1h</div>
                </div>
                <CardTitle className="text-center text-lg font-serif text-primary">Grace Period</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">1 hour if someone occupies your desk, then it reverts to you.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-warm transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-warm-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-lg">🎧</div>
                </div>
                <CardTitle className="text-center text-lg font-serif text-primary">Quiet + Calls</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Use headphones; callbox available (reserve via app or first-come, first-served).</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-warm transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Access & Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-warm-accent/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-xs">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Entry</h4>
                    <p className="text-sm text-muted-foreground">Show QR code for access & daily drink.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Guests</h4>
                    <p className="text-sm text-muted-foreground">Allowed only during open seating with day pass.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-warm transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Payment & Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm">Monthly billing, auto-renew</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm">Prepaid plans: discounted, non-refundable</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm">5-day grace for late payments</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm">Non-transferable; individual use only</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12">
            <Card className="bg-primary text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">The 813 Promise</CardTitle>
                <p className="text-lg opacity-90">A place where work feels good.</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-base opacity-90 max-w-2xl mx-auto">
                  We commit to comfort, calm, fair access, kind service, and continuous improvement.
                </p>
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
          <div className="bg-white/10 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">How to Sign Up:</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm text-white/90">
              <div className="text-center">
                <div className="w-8 h-8 bg-warm-accent text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                <p>Fill out the registration form</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-warm-accent text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                <p>Accept terms & agreements</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-warm-accent text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                <p>Contact Ana for payment</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-warm-accent text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                <p>Get your member portal access</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/signup">
              <Button 
                size="lg"
                className="bg-warm-accent hover:bg-warm-accent/90 text-primary font-medium px-8 py-4 rounded-full shadow-accent transition-all duration-300 hover:scale-105 text-lg"
              >
                Sign Up Today
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-8 py-4 rounded-full transition-all duration-300 text-lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact Us
            </Button>
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
