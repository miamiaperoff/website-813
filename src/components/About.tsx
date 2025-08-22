import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Story
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            After 20 years working remotely across more than 100 spaces worldwide, we've experienced our fair share of delight and frustration. That's why we created 813 (Eight Thirteen, Bryan's birthday), a place where remote work feels just right for Ozamiznons. Whether you're focused on getting things done or taking a well-deserved break, come to 813 for great food, drinks, and a community that lifts you up. We can't wait to welcome you!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center bg-card border-none shadow-warm hover:shadow-accent transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-warm-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">☕</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
              Artisan Coffee
            </h3>
            <p className="text-muted-foreground">
              Locally roasted beans sourced from sustainable farms, 
              carefully crafted by our skilled baristas.
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-card border-none shadow-warm hover:shadow-accent transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-warm-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🥐</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
              Fresh Pastries
            </h3>
            <p className="text-muted-foreground">
              Daily baked goods made from scratch using traditional recipes 
              and the finest ingredients.
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-card border-none shadow-warm hover:shadow-accent transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-warm-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
              Cozy Atmosphere
            </h3>
            <p className="text-muted-foreground">
              A warm, welcoming space where friends gather, 
              stories are shared, and memories are made.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;