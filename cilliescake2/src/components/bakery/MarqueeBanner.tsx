const items = [
  "Wedding Cakes",
  "Birthday Cakes",
  "Cupcakes",
  "Cake Pops",
  "Baby Shower Cakes",
  "Graduation Cakes",
  "Dessert Catering",
  "Custom Toppers",
  "Party Platters",
  "Quinceañera Cakes",
];

const MarqueeBanner = () => (
  <div className="bg-primary py-3 overflow-hidden">
    <div className="animate-marquee whitespace-nowrap flex">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="mx-6 text-sm font-medium text-primary-foreground/90">
          <span className="text-gold mr-3">✦</span>
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;
