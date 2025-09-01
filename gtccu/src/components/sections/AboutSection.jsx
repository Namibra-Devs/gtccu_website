import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function AboutSection() {
  const news = [
    "GTCCU achieves record savings growth in 2025",
    "New loan packages announced for SMEs",
    "Member appreciation day scheduled for October",
    "Digital banking platform update coming next month",
    "GTCCU wins excellence award for customer service",
  ];

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const newsRef = useRef(null);

  // ✅ Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Auto-change news
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, isMobile ? 4000 : 3000); // Mobile gives more time for full slide

    return () => clearInterval(interval);
  }, [news.length, isPaused, isMobile]);

  return (
    <section
      className="relative w-full py-16 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/about-bg1.avif')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* 🔴 News Ticker */}
        <div
          className="flex items-center mb-12 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={newsRef}
        >
          <div className="flex-shrink-0 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 font-bold rounded-l-md shadow-md flex items-center">
            <span>News</span>
            <span className="ml-2 text-red-200">→</span>
          </div>

          {/* ✅ Desktop Animation */}
          {!isMobile && (
            <div className="relative flex-1 min-h-[44px] overflow-hidden ml-2 flex items-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentNewsIndex}
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    x: "-100%",
                    transition: { duration: 0.5, ease: "easeIn" },
                  }}
                  className="absolute inset-0 flex items-center"
                >
                  <span className="text-white font-medium text-lg md:text-xl whitespace-nowrap">
                    {news[currentNewsIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* ✅ Mobile Animation (continuous marquee) */}
          {isMobile && (
            <div className="relative flex-1 min-h-[44px] overflow-hidden ml-2 flex items-center">
              <div
                className="flex"
                style={{
                  animation: "marquee 85s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                  width: `${news.length * 200}%`, // Double the width for seamless loop
                  display: "flex",
                  gap: "2rem", // Space between items
                }}
              >
                {[...news, ...news].map((item, idx) => (
                  <span
                    key={idx}
                    className="text-white font-medium text-base whitespace-nowrap"
                    style={{ flex: `0 0 ${100 / news.length}%` }} // Equal width for each item
                  >
                    {item}
                  </span>
                ))}
              </div>
              <style>
                {`
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${100 * news.length}%); }
                  }
                `}
              </style>
            </div>
          )}

          {/* Navigation Dots (Desktop Only) */}
          <div className="flex-shrink-0 flex space-x-1 mx-3 hidden md:flex">
            {news.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentNewsIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentNewsIndex
                    ? "bg-red-500 scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`View news ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 🖼️ About Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="/images/about1.jpeg"
                alt="About GTCCU"
                className="relative rounded-2xl shadow-lg object-cover w-full h-[350px] md:h-[400px] z-10"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="text-white"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              About GTCCU
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-200">
              GTCCU is committed to empowering our members through innovative
              financial solutions, tailored savings plans, and affordable loans
              that foster growth and security.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-gray-200">
              With decades of trusted service, we remain your partner in
              achieving financial freedom, stability, and prosperity.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
              >
                About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}