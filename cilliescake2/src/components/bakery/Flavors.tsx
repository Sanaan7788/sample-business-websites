const flavors = [
  {
    name: "I Love Chocolate",
    price: "$165+",
    desc: "Double chocolate sponge, dark ganache, chocolate buttercream — for true chocolate devotees.",
    color: "bg-amber-900/10",
    accent: "#5C3D2E",
  },
  {
    name: "Hershey's Vanilla Chocolate",
    price: "$165+",
    desc: "Light vanilla sponge layered with rich Hershey's chocolate frosting — a classic crowd-pleaser.",
    color: "bg-yellow-50",
    accent: "#B8963E",
  },
  {
    name: "Tropical Paradise",
    price: "$175+",
    desc: "Mango, coconut, passion fruit sponge with luscious cream cheese frosting — a vacation in every bite.",
    color: "bg-teal-50",
    accent: "#2D6A5A",
  },
  {
    name: "Chocolate Cream",
    price: "$165+",
    desc: "Silky Chantilly cream paired with fresh berries atop a rich chocolate base — pure indulgence.",
    color: "bg-rose-50",
    accent: "#8B5E5E",
  },
];

const Flavors = () => (
  <section id="flavors" className="py-20 bg-sage-tint">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <span className="text-gold text-sm font-semibold tracking-widest uppercase">Signature Flavors</span>
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Flavors & Pricing
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flavors.map((f, i) => (
          <div key={i} className="rv bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all text-left" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className={`w-full h-3 rounded-full mb-4 ${f.color}`} style={{ backgroundColor: f.accent + "22" }} />
            <h3 className="text-lg font-semibold text-foreground mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {f.name}
            </h3>
            <span className="text-gold font-semibold text-lg">{f.price}</span>
            <p className="text-sm text-text-body mt-3 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl px-6 py-4 inline-flex flex-col sm:flex-row items-center gap-3 rv">
        <span className="text-foreground font-medium">Have a custom flavor in mind?</span>
        <a href="#contact" className="text-primary font-semibold hover:underline">
          Tell us about it →
        </a>
      </div>
    </div>
  </section>
);

export default Flavors;
