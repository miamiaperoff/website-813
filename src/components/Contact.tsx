const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground italic mb-4">
            Visit Us
          </h2>
          <div className="w-16 h-px bg-foreground/20 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground mb-3">
              Address
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              G/F City Park Ave Bldg, City Hall Drive<br />
              Ozamiz, Philippines
            </p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground mb-3">
              Hours
            </h3>
            <p className="text-sm text-foreground">Open All Day, Every Day</p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground mb-3">
              Contact
            </h3>
            <p className="text-sm text-muted-foreground mb-4">hey@813cafe.com</p>
            <a
              href="https://813cafe.org/order-online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs tracking-[0.2em] uppercase font-medium text-foreground border border-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Order Online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
