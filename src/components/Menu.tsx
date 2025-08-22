import { Card } from '@/components/ui/card';

const Menu = () => {
  const menuItems = [
    {
      category: "Signature Drinks",
      items: [
        { name: "Charm Blend", description: "Our house espresso with a hint of vanilla", price: "$4.50" },
        { name: "Golden Latte", description: "Turmeric latte with oat milk and honey", price: "$5.25" },
        { name: "Caramel Cloud", description: "Cold brew with caramel foam and cinnamon", price: "$5.75" }
      ]
    },
    {
      category: "Fresh Pastries",
      items: [
        { name: "Butter Croissant", description: "Flaky, buttery perfection baked fresh daily", price: "$3.25" },
        { name: "Cinnamon Roll", description: "Warm, gooey roll with cream cheese glaze", price: "$4.50" },
        { name: "Almond Scone", description: "Traditional scone with sliced almonds", price: "$3.75" }
      ]
    },
    {
      category: "Light Bites",
      items: [
        { name: "Avocado Toast", description: "Multigrain bread, smashed avocado, sea salt", price: "$8.50" },
        { name: "Breakfast Wrap", description: "Scrambled eggs, cheese, and fresh herbs", price: "$7.25" },
        { name: "Seasonal Salad", description: "Mixed greens with seasonal vegetables", price: "$9.75" }
      ]
    }
  ];

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully curated selection of artisan coffee, 
            fresh pastries, and delicious light bites.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {menuItems.map((category, index) => (
            <Card key={index} className="p-8 bg-card border-none shadow-warm">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <span className="font-semibold text-warm-accent">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;