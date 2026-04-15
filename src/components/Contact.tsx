import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

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

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div className="space-y-8">
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
              <p className="text-sm text-muted-foreground">hey@813cafe.com</p>
            </div>

            <a
              href="https://813cafe.org/order-online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs tracking-[0.2em] uppercase font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Order Online
            </a>
          </div>

          {/* Right — Social */}
          <div>
            <h3 className="font-serif text-2xl font-light text-foreground italic mb-6">
              Follow @813.cafe
            </h3>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Stay updated with our latest happenings, daily specials, and community events.
            </p>

            {/* Instagram grid */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              <div className="aspect-square overflow-hidden">
                <img
                  src="/lovable-uploads/6fb5e738-39ab-438e-80aa-8c990abb3866.png"
                  alt="Working at 813 Cafe"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src="/lovable-uploads/f14be507-5ba4-4f71-87e4-c2943549abcf.png"
                  alt="813 Cafe interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src="/lovable-uploads/e9b661e6-257a-4eac-afb1-3eb063488565.png"
                  alt="Food at 813 Cafe"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <FaFacebook
                className="w-6 h-6 text-foreground hover:text-muted-foreground cursor-pointer transition-colors"
                onClick={() => window.open('https://web.facebook.com/profile.php?id=61579389969937', '_blank')}
              />
              <FaInstagram
                className="w-6 h-6 text-foreground hover:text-muted-foreground cursor-pointer transition-colors"
                onClick={() => window.open('https://www.instagram.com/813.cafe', '_blank')}
              />
              <FaTiktok
                className="w-6 h-6 text-foreground hover:text-muted-foreground cursor-pointer transition-colors"
                onClick={() => window.open('https://www.tiktok.com/@813_cafe', '_blank')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
