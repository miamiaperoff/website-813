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
                eight thirteen BESTSELLERS
              </div>
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Spanish Latte</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Creamy espresso sweetened with condensed milk.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">160</span>
                  </div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Beef Lasagna</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Layered pasta with meat sauce, Béchamel, and two types of cheeses.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">180</span>
                  </div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Muffin</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Blueberry, Chocolate Chip, or Cheese. Our mantra: whatever the problem is, a muffin is the answer.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">55</span>
                  </div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Matcha Latte</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Smooth green tea drink with steamed milk.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">150</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Tsokolate</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Rich chocolate drink from cacao tablea.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">130</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pasta Good for Sharing */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="bg-yellow-500 text-white px-4 py-2 rounded mb-4 text-center font-semibold">
                PASTA GOOD FOR SHARING (SERVES 2)
              </div>
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Carbonara</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Authentic carbonara—egg yolks tempered with pasta water into a silky, creamy sauce that perfectly complements the ham.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">250</span>
                  </div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Spaghetti</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Beefy, hearty spaghetti—slow-simmered meat sauce with savory ground beef, tossed into tender noodles and finished with a sprinkle of cheese.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">220</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Palabok</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Classic pancit palabok with thin rice noodles in rich shrimp sauce, topped with savory crunch and bright citrus.
                      </p>
                    </div>
                    <span className="font-semibold text-primary">150</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle Column - Signature Drinks */}
          <div className="space-y-8">
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="bg-green-800 text-white px-4 py-2 rounded mb-4 text-center font-semibold">
                eight thirteen SIGNATURE DRINKS
              </div>
              <p className="text-sm text-muted-foreground mb-2 text-center">
                All coffee orders come with a featured dessert
              </p>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                Iced or hot · Sweetness level: 0% · 25% · 50% · 75% · 100%
              </p>

              {/* Coffee+ */}
              <h4 className="font-medium text-foreground mb-3">COFFEE+</h4>
              <div className="space-y-2 mb-6">
                {[
                  ['Brewed Coffee', 80], ['Americano', 110], ['Cappuccino', 150], ['Café Latte', 150],
                  ['Vanilla Latte', 150], ['Mocha Latte', 160], ['Caramel Latte', 160], ['Spanish Latte', 160],
                  ['Strawberry Latte', 160], ['Cinnamon Latte', 160], ['Salted Caramel Latte', 160], ['Hazelnut Latte', 160],
                  ['Biscoff Latte', 170], ['Caramel Macchiato', 170], ['Strawberry Mocha Latte', 170], ['Oreo Latte', 170],
                  ['Dirty Matcha', 170], ['Golden Drizzle Latte', 170], ['White Chocolate Latte', 170],
                ].map(([name, price]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{name}</span>
                    <span className="font-semibold text-primary">{price}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-medium text-foreground mb-3">FRAPPE</h4>
              <div className="space-y-2 mb-6">
                {[
                  ['Strawberry Crème', 200], ['Matcha Frappe', 200], ['Oreo Crème Frappe', 200],
                  ['Java Chip Frappe', 200], ['Caramel Frappe', 200], ['White Mocha Frappe', 200],
                ].map(([name, price]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{name}</span>
                    <span className="font-semibold text-primary">{price}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-medium text-foreground mb-3">REFRESHERS</h4>
              <div className="space-y-2 mb-6">
                {[
                  ['Lotus Ink', 130], ['Unleaded Burst', 130], ['Ruby Lemonade Spritz', 130],
                ].map(([name, price]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{name}</span>
                    <span className="font-semibold text-primary">{price}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-medium text-foreground mb-3">NON-COFFEE</h4>
              <div className="space-y-2">
                {[
                  ['Green Tea', 80], ['Fresh Juice', 90], ['Tsokolate', 130], ['Matcha Latte', 150],
                  ['Strawberry Matcha', 170], ['Oreo Matcha Latte', 170],
                ].map(([name, price]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{name}</span>
                    <span className="font-semibold text-primary">{price}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Request a drink / Feedback */}
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground mb-2">REQUEST A DRINK OR GIVE FEEDBACK</p>
                <a
                  href="https://813cafe.org/feedback"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Give Feedback
                </a>
              </div>
            </Card>
          </div>

          {/* Right Column - Build Your Silog */}
          <div className="space-y-8">
            <Card className="p-6 bg-card border-none shadow-warm">
              <div className="bg-yellow-500 text-white px-4 py-2 rounded mb-4 text-center font-semibold">
                BUILD YOUR SILOG 180
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Step 1: Choose one protein</h4>
                  <p className="text-sm text-muted-foreground mb-2">Add any extra protein for 80</p>
                  <div className="flex flex-wrap gap-2 text-sm text-foreground">
                    Beef Tapa · Pork Steak · Hungarian Sausage · Corned Beef · Salmon in Oil · Spanish Sardines · Bangus in Oil
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Extra: Spanish Chorizo · Spam · Siomai · Skinless Longganisa</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Step 2: Two eggs your way</h4>
                  <p className="text-sm text-foreground">Sunny Side Up · Scrambled</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Step 3: Rice</h4>
                  <p className="text-sm text-foreground">Plain Rice · Garlic Fried Rice</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Step 4: Drink</h4>
                  <p className="text-sm text-foreground">Juice · Coffee</p>
                </div>
              </div>
            </Card>

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

          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;