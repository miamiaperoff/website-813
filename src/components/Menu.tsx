import { Card } from '@/components/ui/card';

const Menu = () => {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            MENU
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">
              WIFI with 100+ purchase
            </p>
            <p className="text-sm text-muted-foreground">
              Network: 813-cafe | Password: olivegreen
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Bestsellers */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="bg-red-600 text-white px-4 py-2 rounded mb-4 text-center font-semibold">
                BESTSELLERS
              </div>
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">MATCHA</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Customer favorite matcha w/ fresh milk and sugar syrup (0-4 pumps)
                      </p>
                    </div>
                    <span className="font-semibold text-primary">150</span>
                  </div>
                </div>
                
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">LASAGNA</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fresh House-Made Pasta with Meat Sauce, Béchamel + Fresh Mango Juice
                      </p>
                    </div>
                    <span className="font-semibold text-primary">185</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">TSOKOLATE</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Made with 100% cacao tablea w/ milk and sugar (0-4 pumps)
                      </p>
                    </div>
                    <span className="font-semibold text-primary">110</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Carmela's Classics */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="bg-yellow-500 text-white px-4 py-2 rounded mb-4 text-center font-semibold">
                CARMELA'S CLASSICS
              </div>
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Carmela's Home Favorites</p>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">SIOPAO/MEATBREAD</h4>
                      <p className="text-sm text-muted-foreground">
                        Chicken or Pork, as available. Soft, fluffy, filling. Served warm.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">50</span>
                  </div>
                </div>
                
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">EMPANADA</h4>
                      <p className="text-sm text-muted-foreground">
                        Savory, flaky, and generously filled w/ beef, potatoes, carrots, and cheese.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">35</span>
                  </div>
                </div>
                
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">FRESH LUMPIA</h4>
                      <p className="text-sm text-muted-foreground">
                        Delicate roll of veggies with peanut-garlic sauce.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">40</span>
                  </div>
                </div>
                
                <div>
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
                      <h4 className="font-medium text-foreground">SIOPAO / MEATBREAD</h4>
                      <p className="text-sm text-muted-foreground">
                        Asado or Bola-Bola. Soft, fluffy, filling. Served warm.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">50</span>
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
                    <span className="font-semibold text-primary">35</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            {/* Food Menu */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="bg-yellow-500 text-white px-4 py-2 rounded mb-4 text-center font-semibold">
                FOOD MENU
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">PASTA</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Served with toasted bread and fresh, house-made juice
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Lasagna</span>
                      <span className="font-semibold text-primary">185</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Spaghetti</span>
                      <span className="font-semibold text-primary">165</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Pancit Palabok</span>
                      <span className="font-semibold text-primary">150</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3">ALL-DAY SILOG</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Served with two eggs, garlic rice, and a side of Bacalao
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Tapsilog</span>
                      <span className="font-semibold text-primary">185</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Pork Steak Silog</span>
                      <span className="font-semibold text-primary">175</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Chorizo Silog</span>
                      <span className="font-semibold text-primary">175</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Hungarian Sausage</span>
                      <span className="font-semibold text-primary">175</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Spanish Sardines</span>
                      <span className="font-semibold text-primary">165</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Bangus Silog</span>
                      <span className="font-semibold text-primary">165</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Cornsilog</span>
                      <span className="font-semibold text-primary">155</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Coffee+ */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="bg-yellow-500 text-white px-4 py-2 rounded mb-4 text-center font-semibold">
                COFFEE+
              </div>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                Iced or Hot (0-4 pumps sugar) Comes with a featured dessert
                16 oz, Iced or Hot<br/>
                Choose 1: brownie, or bread
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">LATTE</h4>
                  <span className="font-semibold text-primary">150</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">MOCHA LATTE</h4>
                  <span className="font-semibold text-primary">160</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">CARAMEL LATTE</h4>
                  <span className="font-semibold text-primary">160</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">SPANISH LATTE</h4>
                  <span className="font-semibold text-primary">160</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">CAPPUCCINO</h4>
                  <div>
                    <h4 className="font-medium text-foreground">CAPPUCCINO / LATTE</h4>
                    <p className="text-sm text-muted-foreground">(+₱20.00 to add Mocha or Caramel)</p>
                  </div>
                  <span className="font-semibold text-primary">160</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">AMERICANO</h4>
                  <span className="font-semibold text-primary">110</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">ICED COFFEE</h4>
                  <span className="font-semibold text-primary">110</span>
                  <span className="font-semibold text-primary">120</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">BREWED COFFEE</h4>
                  <span className="font-semibold text-primary">90</span>
                  <span className="font-semibold text-primary">80</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">ICED COFFEE (with Milk & Maple Syrup)</h4>
                  <span className="font-semibold text-primary">100</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">SPANISH LATTE</h4>
                  <span className="font-semibold text-primary">130</span>
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
                  <span className="font-semibold text-primary">100</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">COCONUT WATER</h4>
                  <span className="font-semibold text-primary">40</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">BOTTLED WATER</h4>
                  <span className="font-semibold text-primary">30</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">SPARKLING WATER</h4>
                  <span className="font-semibold text-primary">45</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">SOFT DRINKS</h4>
                  <span className="font-semibold text-primary">30</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-foreground">CUCUMBER JUICE</h4>
                  <span className="font-semibold text-primary">40</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Coworking Information */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">813</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  Come here often?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visit 813cafe.com/coworking for uninterrupted internet, unlimited coffee, and 13% off all purchases
                </p>
              </div>
            </Card>

            {/* Feedback Section */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Want to see something else on our menu? Let us know!
                </p>
                <a 
                  href="https://813cafe.org/feedback" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Give Feedback
                </a>
                <p className="text-sm font-medium text-primary mt-3">THANK YOU!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;