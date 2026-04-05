import { MessageSquare, Palette, CreditCard, Truck, Clock, DollarSign, MapPin, Sparkles } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Reach Out", timing: "Day 1", desc: "Call, email, or fill out our quote form. Tell us your vision." },
  { icon: Palette, title: "Design Together", timing: "Days 2–4", desc: "We'll refine flavors, design, size, and every detail together." },
  { icon: CreditCard, title: "Confirm & Deposit", timing: "Day 5", desc: "50% deposit locks in your date. Balance due at pickup." },
  { icon: Truck, title: "Pickup or Delivery", timing: "Your Big Day", desc: "Your masterpiece is ready — fresh, beautiful, and on time." },
];

const infoItems = [
  { icon: Clock, label: "2-Week Lead Time", desc: "Required for all custom orders" },
  { icon: DollarSign, label: "50% Deposit", desc: "Balance at pickup" },
  { icon: MapPin, label: "Houston Area", desc: "Pickup & delivery available" },
  { icon: Sparkles, label: "Fully Custom", desc: "No templates, only originals" },
];

const Process = () => (
  <section id="process" className="py-20 bg-warm-off-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <span className="text-gold text-sm font-semibold tracking-widest uppercase">How It Works</span>
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-14" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        How to Order
      </h2>

      <div className="relative flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
        {/* Dashed connector */}
        <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0 border-t-2 border-dashed border-primary/30" />

        {steps.map((s, i) => (
          <div key={i} className="rv flex-1 flex flex-col items-center text-center relative" style={{ transitionDelay: `${i * 150}ms` }}>
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 relative z-10 shadow-lg">
              {i + 1}
            </div>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-2">
              <s.icon size={18} className="text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">{s.title}</h4>
            <span className="text-xs text-gold font-semibold mb-2">{s.timing}</span>
            <p className="text-sm text-text-body max-w-[200px]">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
        {infoItems.map((item, i) => (
          <div key={i} className="rv flex items-center gap-3 bg-background rounded-xl px-5 py-4 shadow-sm" style={{ transitionDelay: `${i * 80}ms` }}>
            <item.icon size={20} className="text-gold flex-shrink-0" />
            <div className="text-left">
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
              <span className="text-xs text-text-body block">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
