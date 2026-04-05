import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria G.",
    event: "Wedding",
    text: "Cillie's created the most stunning four-tier cake for our wedding. Every guest asked who made it — the design was breathtaking and the red velvet flavor was out of this world. We couldn't have imagined anything more perfect.",
  },
  {
    name: "Denise T.",
    event: "Birthday",
    text: "My husband is a huge football fan, and Cillie's sculpted a jaw-dropping stadium cake for his 50th. The level of detail was insane — from the tiny players to the scoreboard. He was speechless. Best birthday surprise ever!",
  },
  {
    name: "Ashley R.",
    event: "Baby Shower · Katy, TX",
    text: "We ordered the Tropical Paradise cake for our baby shower and it was absolutely divine. The mango and passion fruit flavors were so fresh, and the decoration matched our theme perfectly. Cillie's went above and beyond!",
  },
];

const Testimonials = () => (
  <section className="py-20 bg-sage-tint">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <span className="text-gold text-sm font-semibold tracking-widest uppercase">Testimonials</span>
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        What Our Clients Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            data-tilt
            className="rv bg-background rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all text-left relative"
            style={{ transitionDelay: `${i * 120}ms`, transformStyle: "preserve-3d" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
              e.currentTarget.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`;
              e.currentTarget.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
              e.currentTarget.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transition = "transform 0.4s ease";
              e.currentTarget.style.transform = "perspective(600px) rotateY(0) rotateX(0)";
              setTimeout(() => { e.currentTarget.style.transition = ""; }, 400);
            }}
          >
            <div className="card-shine" />
            <Quote size={28} className="text-primary/15 mb-4" />
            <div className="flex text-gold mb-3">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-text-body leading-relaxed mb-6">"{t.text}"</p>
            <div className="border-t border-border pt-4">
              <span className="font-semibold text-foreground">{t.name}</span>
              <span className="text-xs text-text-body block">{t.event}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
