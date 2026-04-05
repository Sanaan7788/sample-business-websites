import { Heart, Award, Users, Clock } from "lucide-react";

const values = [
  { icon: Heart, label: "Made with Love", desc: "Every cake is a labor of love" },
  { icon: Award, label: "Premium Quality", desc: "Only the finest ingredients" },
  { icon: Users, label: "Client Focused", desc: "Your vision, our creation" },
  { icon: Clock, label: "On Time, Always", desc: "Reliable delivery guaranteed" },
];

const About = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
    setTimeout(() => { e.currentTarget.style.transition = ""; }, 500);
  };

  return (
    <section id="about" className="py-20 bg-warm-off-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="rv-l">
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80&fit=crop"
                alt="Artisan cake crafted by Cillie's Cakes"
                className="w-full h-[450px] object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur rounded-lg px-3 py-2 animate-float">
                <span className="text-sm font-semibold text-primary">10+ Years</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg px-3 py-2 animate-float-delay">
                <span className="text-sm font-semibold text-gold">Houston, TX</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="rv-r">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              A Passion for Perfection
            </h2>
            <p className="text-text-body leading-relaxed mb-4">
              From a small Houston kitchen to one of the city's most sought-after custom cake studios, Cillie's Cakes & Snacks was born out of a simple belief: every celebration deserves a masterpiece. Our founder's passion for baking started as a hobby, blossomed into an art, and grew into a thriving business built on word-of-mouth and repeat customers.
            </p>
            <p className="text-text-body leading-relaxed mb-8">
              We work closely with every client — no templates, no shortcuts. Each cake is designed from scratch to reflect your personality, your theme, and your taste. From sculptured wedding showstoppers to whimsical birthday creations, every detail is handcrafted with love and the finest ingredients.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:scale-105"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Value cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {values.map((v, i) => (
            <div key={i} className="rv bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                <v.icon size={22} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{v.label}</h4>
              <p className="text-sm text-text-body">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
