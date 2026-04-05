import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", occasion: "", date: "", servings: "", vision: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-warm-off-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <div className="rv-l">
            <h3 className="text-xl font-semibold text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Let's Create Something Beautiful
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground block">Phone</span>
                  <a href="tel:2815301666" className="text-text-body hover:text-primary transition-colors">(281) 530-1666</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground block">Email</span>
                  <a href="mailto:Cilliescakes@gmail.com" className="text-text-body hover:text-primary transition-colors">Cilliescakes@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground block">Location</span>
                  <span className="text-text-body">Houston, Texas</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock size={16} className="text-gold" /> Business Hours
              </h4>
              <div className="text-sm text-text-body space-y-1">
                <p>Tuesday – Friday: 9:00 AM – 5:00 PM</p>
                <p>Saturday: 9:00 AM – 3:00 PM</p>
                <p>Sunday: By Appointment Only</p>
                <p>Monday: Closed</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
              <a
                href="https://www.facebook.com/groups/CilliesCakesofHouston"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Facebook size={18} /> Cillies Cakes of Houston
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="rv-r">
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Request a Quote
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                  >
                    <option value="">Select Occasion</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Baby Shower</option>
                    <option>Graduation</option>
                    <option>Anniversary</option>
                    <option>Corporate/Office Party</option>
                    <option>Quinceañera</option>
                    <option>Other</option>
                  </select>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      placeholder="Event Date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Servings Estimate"
                      value={form.servings}
                      onChange={(e) => setForm({ ...form, servings: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <textarea
                    placeholder="Describe your cake vision..."
                    rows={4}
                    value={form.vision}
                    onChange={(e) => setForm({ ...form, vision: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
                  />
                  <p className="text-xs text-text-body">⏰ Minimum 2-week lead time required for all custom orders.</p>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-[1.02]"
                  >
                    Send Quote Request
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎂</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Thank You!
                  </h3>
                  <p className="text-text-body mb-6">
                    We've received your request and will get back to you within 24 hours.
                  </p>
                  <a
                    href="tel:2815301666"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                  >
                    <Phone size={16} /> Call Us Directly
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
