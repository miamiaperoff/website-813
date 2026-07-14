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
          {/* Left Column — Bestsellers + Made-to-Order Pasta */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-6">
                Bestsellers
              </h3>
              <div className="space-y-4">
                {[
                  ['Beef Lasagna', 'Layered pasta with meat sauce, Béchamel, and cheese overload', 170],
                  ['Caramel Macchiato', 'A decadently creamy blend of milk, caramel, vanilla, and coffee', 170],
                  ['Palabok', 'Thin rice noodles in rich shrimp sauce, topped with savory crunch & bright citrus', 180],
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

            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-2">
                Made-to-Order Pasta
              </h3>
              <p className="text-xs text-muted-foreground mb-6">Good for 2 · Allow 30 mins</p>
              <div className="space-y-4">
                {[
                  ['Carbonara', 'Authentic: no cream, only tempered egg yolk with bacon.', 280],
                  ['Spaghetti', 'Classic, slow-simmered tomato sauce. Generous beef.', 220],
                  ['Buttered Garlic Shrimp Pasta', 'Tangy butter-garlic-tomato sauce with a bit of a kick.', 280],
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

          {/* Middle Column — Drinks */}
          <div>
            {[
              {
                category: 'Coffee',
                items: [
                  ['Brewed Coffee', 100], ['Americano', 120], ['Cappuccino', 160], ['Cafe Latte', 160],
                  ['Spanish Latte', 170], ['Caramel Latte', 170], ['Salted Cheesecake', 180],
                  ['Sea Salt Latte', 180], ['Dirty Matcha', 180],
                ],
              },
              {
                category: 'Non-Coffee',
                items: [
                  ['Tsokolate', 140], ['Matcha Latte', 160], ['Sea Salt Matcha', 180],
                  ['Oreo Creme Frappe', 220], ['Biscoff Frappe', 220],
                  ['Ruby Lemonade Spritz', 130], ['Lotus Ink Refresher', 130],
                ],
              },
            ].map((section) => (
              <div key={section.category} className="mb-8">
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-6">
                  {section.category}
                </h3>
                <div className="space-y-2">
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

          {/* Right Column — Rice Meals */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-2 mb-6">
                Rice Meals · 200
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Choices</h4>
                  <p className="text-xs text-foreground leading-relaxed">
                    Bangus in Oil · Beef Tapa · Corned Beef · Hungarian Sausage · Pork Steak · Salmon in Oil · Siomai · Skinless Longganisa · Spam · Spanish Chorizo · Spanish Sardines · Tocino
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">+ Two Eggs</h4>
                  <p className="text-xs text-foreground">Sunny Side Up · Scrambled</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">+ Rice</h4>
                  <p className="text-xs text-foreground">Plain · Garlic Rice</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">+ Drink</h4>
                  <p className="text-xs text-foreground">Fresh Juice · Brewed Coffee</p>
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
