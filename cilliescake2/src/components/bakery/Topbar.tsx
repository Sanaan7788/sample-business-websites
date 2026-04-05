import { Phone, Mail, MapPin } from "lucide-react";

const Topbar = () => (
  <div className="bg-primary text-primary-foreground py-2 text-sm">
    <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-2 md:gap-4">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <a href="tel:2815301666" className="flex items-center gap-1.5 text-gold hover:opacity-80 transition-opacity">
          <Phone size={14} /> (281) 530-1666
        </a>
        <a href="mailto:Cilliescakes@gmail.com" className="flex items-center gap-1.5 text-gold hover:opacity-80 transition-opacity">
          <Mail size={14} /> Cilliescakes@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-1.5 text-primary-foreground/80">
        <MapPin size={14} className="text-gold" /> Houston, Texas
      </div>
    </div>
  </div>
);

export default Topbar;
