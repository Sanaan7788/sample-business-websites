import { Heart, Cake, CakeSlice, Baby, GraduationCap, UtensilsCrossed } from "lucide-react";

const services = [
  { icon: Heart, title: "Wedding Cakes", desc: "Multi-tier masterpieces designed to match your theme, flowers, and venue. From classic elegance to modern art." },
  { icon: Cake, title: "Birthday Cakes", desc: "Fun, creative, fully custom. Sculpted shapes, themed designs, or sophisticated tiered cakes for milestone birthdays." },
  { icon: CakeSlice, title: "Cupcakes & Cake Pops", desc: "Perfectly portioned treats for parties, corporate events, and favors. Custom flavors and decorations available." },
  { icon: Baby, title: "Baby Showers", desc: "Adorable, themed cakes and dessert tables to welcome your little one. Gender reveals, elephant themes, and more." },
  { icon: GraduationCap, title: "Graduation & Milestones", desc: "Celebrate every achievement with a show-stopping cake. School colors, logos, and personalized messages." },
  { icon: UtensilsCrossed, title: "Dessert Catering", desc: "Full dessert spreads for any event. Cupcakes, cake pops, cookies, and custom platters for 20 to 200+ guests." },
];

const Services = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    e.currentTarget.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transition = "transform 0.4s ease";
    e.currentTarget.style.transform = "perspective(600px) rotateY(0) rotateX(0) scale(1)";
    setTimeout(() => { e.currentTarget.style.transition = ""; }, 400);
  };

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-gold text-sm font-semibold tracking-widest uppercase">What We Offer</span>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Our Services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              data-tilt
              className="rv relative bg-background rounded-2xl p-8 shadow-sm border border-border hover:shadow-xl transition-shadow text-left cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms`, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="card-shine" />
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                <s.icon size={26} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {s.title}
              </h3>
              <p className="text-sm text-text-body leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
