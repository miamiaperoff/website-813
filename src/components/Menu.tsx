import { Card } from '@/components/ui/card';

const Menu = () => {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            MENU
          </h2>
          <p className="text-lg text-muted-foreground">
            2 Hours WIFI with P100+ purchase
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Main Menu Items */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">ALL-DAY SILOG WITH COFFEE</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Choose 1: Tapa, Chorizo, or Corned Beef<br/>
                        served with Garlic Rice, Side of Bacalao, and Two Eggs.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">165</span>
                  </div>
                </div>
                
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-foreground">FRESH FRUIT BOWL</h4>
                    <span className="font-semibold text-primary">150</span>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded">
                  <h5 className="font-medium text-primary mb-2">TODAY'S SPECIALS</h5>
                  <p className="text-sm text-muted-foreground">Available 11:30 AM</p>
                </div>
              </div>
            </Card>

            {/* Carmela's Classics */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl font-semibold text-primary mb-2">
                  CARMELA'S CLASSICS
                </h3>
                <p className="text-sm text-muted-foreground">Hand-picked Ozamiznon favorites.</p>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">CHOCOLATE CAKE</h4>
                      <p className="text-sm text-muted-foreground">
                        Moist, dense, and deeply chocolatey. Well-loved since 1996!
                      </p>
                    </div>
                    <span className="font-semibold text-primary">70</span>
                  </div>
                </div>
                
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">SIOPAO</h4>
                      <p className="text-sm text-muted-foreground">
                        Asado or Bola-Bola. Soft, fluffy, filling. Served warm.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">60</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">EMPANADA</h4>
                      <p className="text-sm text-muted-foreground">
                        Savory, flaky, and generously filled with beef, potatoes, carrots, and cheese.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">50</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            {/* Coffee+ */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-4 text-center">
                COFFEE+
              </h3>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                16 oz, Iced or Hot<br/>
                choose 1: cake, brownie, or bread
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">CAPPUCCINO / LATTE</h4>
                    <p className="text-sm text-muted-foreground">+P20.00 to add Mocha or Caramel</p>
                  </div>
                  <span className="font-semibold text-primary">160</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">AMERICANO</h4>
                  <span className="font-semibold text-primary">130</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">BREWED COFFEE</h4>
                  <span className="font-semibold text-primary">80</span>
                </div>
              </div>
            </Card>

            {/* Specialty Drinks */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-4 text-center">
                SPECIALTY DRINKS
              </h3>
              <p className="text-sm text-muted-foreground mb-6 text-center">12 oz, Iced or Hot</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">TSOKOLATE</h4>
                    <p className="text-sm text-muted-foreground">100% Cacao Drink with Fresh Milk</p>
                  </div>
                  <span className="font-semibold text-primary">60</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">MATCHA LATTE</h4>
                    <p className="text-sm text-muted-foreground">
                      Authentic Japanese Matcha with Fresh Milk and Maple Syrup
                    </p>
                  </div>
                  <span className="font-semibold text-primary">130</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">GREEN TEA</h4>
                  <span className="font-semibold text-primary">80</span>
                </div>
              </div>
            </Card>

            {/* Cold Drinks */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6 text-center">
                COLD DRINKS
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">FRESH JUICES</h4>
                    <p className="text-sm text-muted-foreground">
                      Seasonal and limited availability. No sugar added.<br/>
                      Guava | Mango | Orange
                    </p>
                  </div>
                  <span className="font-semibold text-primary">130</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">COCONUT WATER</h4>
                  <span className="font-semibold text-primary">45</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">BOTTLED WATER</h4>
                  <span className="font-semibold text-primary">35</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">SPARKLING WATER</h4>
                  <span className="font-semibold text-primary">45</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">SOFT DRINKS</h4>
                  <span className="font-semibold text-primary">45</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* More Eats */}
            {/* More Eats */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6 text-center">
                MORE EATS
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">PASTA</h4>
                    <p className="text-sm text-muted-foreground">Lasagna, Spaghetti, Pancit Palabok</p>
                  </div>
                  <span className="font-semibold text-primary">185</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">SOUP</h4>
                    <p className="text-sm text-muted-foreground">
                      Special Arroz Caldo
                    </p>
                  </div>
                  <span className="font-semibold text-primary">100</span>
                </div>
              </div>
            </Card>

            {/* Coworking Plans Header */}
            <div className="text-center">
              <h3 className="font-serif text-3xl font-semibold text-primary mb-2">
                COWORKING PLANS
              </h3>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                Available September 12, 2025
              </div>
            </div>

            {/* Day Pass */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6 text-center">
                DAY PASS
              </h3>
              
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-primary">P400/24 HOURS</span>
              </div>
              
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Fast, reliable Starlink internet</li>
                <li>• Unlimited brewed coffee</li>
              </ul>
            </Card>

            {/* 813 Club */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6 text-center">
                813 CLUB
              </h3>
              
              <div className="text-center mb-4">
                <span className="text-lg line-through text-muted-foreground">P4,500</span>
                <span className="text-3xl font-bold text-primary ml-2">P3,500/MONTH</span>
              </div>
              
              <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                <li>• 24/7 access with open seating</li>
                <li>• Fast, reliable Starlink internet</li>
                <li>• Free personalized mug for use onsite with unlimited brewed coffee</li>
                <li>• 20% off ALL other items</li>
                <li>• Meeting rooms and soundproof booths</li>
              </ul>
              
              <p className="text-sm text-muted-foreground mb-4">
                Ideal for freelancers, remote workers, and small teams. 813.com/coworking
              </p>
              
              <div className="bg-primary/10 p-4 rounded text-center">
                <p className="text-sm font-medium text-primary mb-2">COMING SOON</p>
                <p className="text-xs text-muted-foreground">EXCLUSIVE PERKS FOR EARLY MEMBERS</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;