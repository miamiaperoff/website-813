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
            After 20 years working remotely worldwide, we created 813 — your new favorite spot in Ozamiz where great food, drinks, and community come together to make remote work feel good. Come join us!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center bg-card border-none shadow-warm hover:shadow-accent transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-warm-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎂</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
              Fresh & Delicious Food
            </h3>
            <p className="text-muted-foreground">
              Established in 1996 by our co-founder's mom, Carmela's Home Favorites is now a staple in our town. Stop by for the Chocolate Cake if you're feeling sweet, or Dinuguan & Puto if you're being called to savory.
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-card border-none shadow-warm hover:shadow-accent transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-warm-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
              24/7 Access to Fast WIFI
            </h3>
            <p className="text-muted-foreground">
              Reliable high-speed internet powered by Starlink technology, ensuring you stay connected whether you're working on important projects or streaming your favorite content.
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-card border-none shadow-warm hover:shadow-accent transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-warm-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
              Community Events
            </h3>
            <p className="text-muted-foreground">
              Join us for regular community gatherings like Tech Tuesdays and other events that bring together local professionals, entrepreneurs, and creative minds.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;