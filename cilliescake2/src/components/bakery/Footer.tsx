import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80 py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-background mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Cillie's Cakes & Snacks
          </h3>
          <p className="text-sm leading-relaxed mb-4 text-background/60">
            Houston's premier custom cake studio. Handcrafted cakes for weddings, birthdays, baby showers, and every celebration in between.
          </p>
          <a
            href="https://www.facebook.com/groups/CilliesCakesofHouston"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:opacity-80 transition-opacity text-sm"
          >
            <Facebook size={16} /> Facebook
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm tracking-wider uppercase">Navigation</h4>
          <nav className="flex flex-col gap-2">
            {["About", "Services", "Flavors", "Gallery", "Process", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-background/60 hover:text-gold transition-colors">
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm tracking-wider uppercase">Services</h4>
          <div className="flex flex-col gap-2 text-sm text-background/60">
            <span>Wedding Cakes</span>
            <span>Birthday Cakes</span>
            <span>Cupcakes & Cake Pops</span>
            <span>Baby Shower Cakes</span>
            <span>Dessert Catering</span>
            <span>Custom Designs</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm tracking-wider uppercase">Contact</h4>
          <div className="space-y-3 text-sm">
            <a href="tel:2815301666" className="flex items-center gap-2 text-background/60 hover:text-gold transition-colors">
              <Phone size={14} className="text-gold" /> (281) 530-1666
            </a>
            <a href="mailto:Cilliescakes@gmail.com" className="flex items-center gap-2 text-background/60 hover:text-gold transition-colors">
              <Mail size={14} className="text-gold" /> Cilliescakes@gmail.com
            </a>
            <div className="flex items-center gap-2 text-background/60">
              <MapPin size={14} className="text-gold flex-shrink-0" /> Houston, Texas
            </div>
            <div className="flex items-start gap-2 text-background/60 pt-2">
              <Clock size={14} className="text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p>Tue–Fri: 9AM–5PM</p>
                <p>Sat: 9AM–3PM</p>
                <p>Sun: By Appt</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 pt-6 text-center text-xs text-background/40">
        © {new Date().getFullYear()} Cillie's Cakes & Snacks. All rights reserved. Houston, Texas.
      </div>
    </div>
  </footer>
);

export default Footer;
