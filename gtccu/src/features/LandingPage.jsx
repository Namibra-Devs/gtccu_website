import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutSection from "@sections/AboutSection";
import ProductsSection from "../components/sections/ProductSection";

const slides = [
  {
    id: 1,
    image: "/images/hero1.jpg",
    title: "Welcome to GTCCU",
    subtitle: "Your trusted Credit Union for savings, loans, and financial growth.",
  },
  {
    id: 2,
    image: "/images/hero2.png",
    title: "Secure Your Future",
    subtitle: "Flexible savings and investment options tailored for you.",
  },
  {
    id: 3,
    image: "/images/hero4.webp",
    title: "Smart Loans, Easy Access",
    subtitle: "Quick, reliable and affordable loans to support your dreams.",
  },
];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Slider */}
      <section className="relative w-full h-[100vh] overflow-hidden">
        <AnimatePresence>
          {slides.map(
            (slide, index) =>
              index === current && (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                    <motion.h1
                      className="text-4xl md:text-6xl font-bold mb-4"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      className="text-lg md:text-2xl max-w-2xl"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

       
      </section>

      {/* About Section */}
      <AboutSection />
      <ProductsSection />
    </>
  );
}
