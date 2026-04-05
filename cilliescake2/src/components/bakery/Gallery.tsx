import { useState } from "react";

const images = [
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&fit=crop", cat: "wedding", alt: "Wedding cake" },
  { src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80&fit=crop", cat: "birthday", alt: "Birthday cake" },
  { src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80&fit=crop", cat: "babyshower", alt: "Baby shower cake" },
  { src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80&fit=crop", cat: "wedding", alt: "Elegant wedding cake" },
  { src: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80&fit=crop", cat: "custom", alt: "Custom design cake" },
  { src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80&fit=crop", cat: "birthday", alt: "Colorful birthday cake" },
  { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&fit=crop", cat: "custom", alt: "Cupcakes" },
  { src: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=80&fit=crop", cat: "birthday", alt: "Designer birthday cake" },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Wedding", value: "wedding" },
  { label: "Birthday", value: "birthday" },
  { label: "Baby Shower", value: "babyshower" },
  { label: "Custom", value: "custom" },
];

const Gallery = () => {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? images : images.filter((img) => img.cat === active);

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Work</span>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Cake Gallery
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div
              key={img.src + i}
              className="rv-s relative rounded-xl overflow-hidden group cursor-pointer"
              style={{ transitionDelay: `${i * 60}ms` }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
                e.currentTarget.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transition = "transform 0.4s ease";
                e.currentTarget.style.transform = "perspective(600px) rotateY(0) rotateX(0)";
                setTimeout(() => { e.currentTarget.style.transition = ""; }, 400);
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors flex items-end p-4">
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#fff" }}>
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
