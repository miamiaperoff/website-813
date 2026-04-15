const Menu = () => {
  return (
    <section id="menu" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground italic mb-4">
            Menus
          </h2>
          <div className="w-16 h-px bg-foreground/20 mx-auto mb-6" />
          <p className="text-sm text-muted-foreground tracking-wide">
            WiFi with ₱100+ purchase &nbsp;·&nbsp; Network: 813-cafe &nbsp;·&nbsp; Password: olivegreen
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="space-y-10">
            {/* Bestsellers */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-6">
                Bestsellers
              </h3>
              <div className="space-y-4">
                {[
                  ['Spanish Latte', 'Creamy espresso sweetened with condensed milk', 160],
                  ['Beef Lasagna', 'Layered pasta with meat sauce, Béchamel, and two types of cheeses', 180],
                  ['Muffin', 'Blueberry, Chocolate Chip, or Cheese — whatever the problem, a muffin is the answer', 55],
                  ['Matcha Latte', 'Smooth green tea drink with steamed milk', 150],
                  ['Tsokolate', 'Rich chocolate drink from cacao tablea', 130],
                ].map(([name, desc, price]) => (
                  <div key={name as string} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                    <span className="text-sm text-foreground font-light">{price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pasta Sharing */}
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-6">
                Pasta · Good for Sharing
              </h3>
              <div className="space-y-4">
                {[
                  ['Carbonara', 'Egg yolks tempered with pasta water into a silky sauce with ham', 250],
                  ['Spaghetti', 'Slow-simmered meat sauce with savory ground beef', 220],
                  ['Palabok', 'Thin rice noodles in rich shrimp sauce with savory crunch and citrus', 150],
                ].map(([name, desc, price]) => (
                  <div key={name as string} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                    <span className="text-sm text-foreground font-light">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column — Signature Drinks */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-6">
              Signature Drinks
            </h3>
            <p className="text-xs text-muted-foreground mb-1">All coffee orders include a featured dessert</p>
            <p className="text-xs text-muted-foreground mb-6">
              Iced or hot · Sweetness: 0% · 25% · 50% · 75% · 100%
            </p>

            {[
              {
                category: 'Coffee+',
                items: [
                  ['Brewed Coffee', 80], ['Americano', 110], ['Cappuccino', 150], ['Café Latte', 150],
                  ['Vanilla Latte', 150], ['Mocha Latte', 160], ['Caramel Latte', 160], ['Spanish Latte', 160],
                  ['Strawberry Latte', 160], ['Cinnamon Latte', 160], ['Salted Caramel Latte', 160],
                  ['Hazelnut Latte', 160], ['Biscoff Latte', 170], ['Caramel Macchiato', 170],
                  ['Strawberry Mocha Latte', 170], ['Oreo Latte', 170], ['Dirty Matcha', 170],
                  ['Golden Drizzle Latte', 170], ['White Chocolate Latte', 170],
                ],
              },
              {
                category: 'Frappe',
                items: [
                  ['Strawberry Crème', 200], ['Matcha Frappe', 200], ['Oreo Crème Frappe', 200],
                  ['Java Chip Frappe', 200], ['Caramel Frappe', 200], ['White Mocha Frappe', 200],
                ],
              },
              {
                category: 'Refreshers',
                items: [
                  ['Lotus Ink', 130], ['Unleaded Burst', 130], ['Ruby Lemonade Spritz', 130],
                ],
              },
              {
                category: 'Non-Coffee',
                items: [
                  ['Green Tea', 80], ['Fresh Juice', 90], ['Tsokolate', 130], ['Matcha Latte', 150],
                  ['Strawberry Matcha', 170], ['Oreo Matcha Latte', 170],
                ],
              },
            ].map((section) => (
              <div key={section.category} className="mb-6">
                <h4 className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-3">
                  {section.category}
                </h4>
                <div className="space-y-1.5">
                  {section.items.map(([name, price]) => (
                    <div key={name as string} className="flex justify-between items-center">
                      <span className="text-sm text-foreground">{name}</span>
                      <span className="text-sm text-foreground font-light">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column — Build Your Silog */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-6">
                Build Your Silog · 180
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Step 1: Choose one protein</h4>
                  <p className="text-xs text-muted-foreground">Add any extra protein for 80</p>
                  <p className="text-xs text-foreground mt-1">
                    Beef Tapa · Pork Steak · Hungarian Sausage · Corned Beef · Salmon in Oil · Spanish Sardines · Bangus in Oil
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Extra: Spanish Chorizo · Spam · Siomai · Skinless Longganisa
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Step 2: Two eggs your way</h4>
                  <p className="text-xs text-foreground">Sunny Side Up · Scrambled</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Step 3: Rice</h4>
                  <p className="text-xs text-foreground">Plain Rice · Garlic Fried Rice</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Step 4: Drink</h4>
                  <p className="text-xs text-foreground">Juice · Coffee</p>
                </div>
              </div>
            </div>

            {/* Coworking CTA */}
            <div className="border border-border p-6 text-center">
              <p className="font-serif text-xl font-light text-foreground italic mb-2">Come here often?</p>
              <p className="text-xs text-muted-foreground mb-4">
                813cafe.com/coworking — uninterrupted internet, unlimited coffee, and 13% off all purchases.
              </p>
              <a
                href="/coworking"
                className="text-xs tracking-[0.2em] uppercase font-medium text-foreground border border-foreground px-6 py-2.5 inline-block hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            {/* Feedback */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Request a drink or give feedback
              </p>
              <a
                href="https://813cafe.org/feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] uppercase font-medium text-foreground border border-foreground px-6 py-2.5 inline-block hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Give Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
