import { Phone, Mail, MapPin } from "lucide-react";

const CTAStrip = () => (
  <section className="py-16 bg-primary text-primary-foreground text-center">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Your Dream Cake Starts Here
      </h2>
      <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
        Ready to create something unforgettable? Let's bring your vision to life.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <a
          href="tel:2815301666"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gold text-foreground text-base font-medium hover:opacity-90 transition-all hover:scale-105"
        >
          <Phone size={18} /> Call Now
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-primary-foreground text-primary-foreground text-base font-medium hover:bg-primary-foreground/10 transition-all hover:scale-105"
        >
          Get a Quote
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
        <span className="flex items-center gap-1.5"><Phone size={14} className="text-gold" /> (281) 530-1666</span>
        <span className="flex items-center gap-1.5"><Mail size={14} className="text-gold" /> Cilliescakes@gmail.com</span>
        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gold" /> Houston, Texas</span>
      </div>
    </div>
  </section>
);

export default CTAStrip;
