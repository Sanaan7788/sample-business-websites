import { useEffect } from "react";
import Topbar from "@/components/bakery/Topbar";
import Header from "@/components/bakery/Header";
import Hero from "@/components/bakery/Hero";
import MarqueeBanner from "@/components/bakery/MarqueeBanner";
import About from "@/components/bakery/About";
import Services from "@/components/bakery/Services";
import Flavors from "@/components/bakery/Flavors";
import Gallery from "@/components/bakery/Gallery";
import Process from "@/components/bakery/Process";
import Testimonials from "@/components/bakery/Testimonials";
import CTAStrip from "@/components/bakery/CTAStrip";
import Contact from "@/components/bakery/Contact";
import Footer from "@/components/bakery/Footer";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".rv, .rv-l, .rv-r, .rv-s").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Topbar />
      <Header />
      <Hero />
      <MarqueeBanner />
      <About />
      <Services />
      <Flavors />
      <Gallery />
      <Process />
      <Testimonials />
      <CTAStrip />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
