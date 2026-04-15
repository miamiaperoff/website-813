const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8 italic">
            Our Story
          </h2>
          <div className="w-16 h-px bg-foreground/20 mx-auto mb-8" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            After 20 years working remotely worldwide, we created 813 — your new favorite spot in Ozamiz where great food, drinks, and community come together to make remote work feel good.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="font-serif text-5xl font-light text-foreground mb-3">🎂</p>
            <h3 className="font-serif text-xl font-medium text-foreground mb-3">
              Fresh & Delicious
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Established in 1996 by our co-founder's mom, Carmela's Home Favorites brings you unforgettable flavors — from Chocolate Cake to Dinuguan & Puto.
            </p>
          </div>

          <div>
            <p className="font-serif text-5xl font-light text-foreground mb-3">🚀</p>
            <h3 className="font-serif text-xl font-medium text-foreground mb-3">
              24/7 Fast WiFi
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reliable high-speed internet powered by Starlink, so you stay connected for work, streaming, or your next big project.
            </p>
          </div>

          <div>
            <p className="font-serif text-5xl font-light text-foreground mb-3">🎉</p>
            <h3 className="font-serif text-xl font-medium text-foreground mb-3">
              Community Events
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Join regular gatherings like Tech Tuesdays that bring together local professionals, entrepreneurs, and creative minds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
