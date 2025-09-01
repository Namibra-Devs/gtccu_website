import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Banknote,
  Wallet,
  TrendingUp,
  CheckCircle,
  Users,
  Shield,
} from "lucide-react";

export default function ProductsSection() {
  const products = [
    {
      id: 1,
      title: "Savings Package",
      desc: "Flexible savings accounts designed to help you achieve your financial goals.",
      img: "/images/savings.jpg",
      icon: Wallet,
      link: "/products/savings",
    },
    {
      id: 2,
      title: "Loan Package",
      desc: "Affordable loans with competitive rates tailored to your needs.",
      img: "/images/loans.jpg",
      icon: Banknote,
      link: "/products/loans",
    },
    {
      id: 3,
      title: "Investment Plan",
      desc: "Grow your wealth with our secure investment opportunities.",
      img: "/images/gtccu-logo1.PNG",
      icon: TrendingUp,
      link: "/products/investments",
    },
  ];

  const timeline = [
    {
      id: 1,
      icon: Users,
      title: "Member First",
      desc: "Our focus is always on serving our members with transparency and care.",
    },
    {
      id: 2,
      icon: Shield,
      title: "Trusted & Secure",
      desc: "We ensure your savings and investments are secure and well-protected.",
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Growth Guaranteed",
      desc: "We provide financial tools that help you grow sustainably.",
    },
  ];

  // 🔹 Animate timeline line growth
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 80%"], // starts when section enters viewport, ends when bottom leaves
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // 🔹 State for mobile touch overlay
  const [activeCardId, setActiveCardId] = useState(null);

  // 🔹 Handle touch events for mobile
  const handleTouchStart = (id) => {
    setActiveCardId(id);
  };

  const handleTouchEnd = () => {
    setActiveCardId(null);
  };

  return (
    <section className="relative w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-blue-900">
          Our Products
        </h2>

        {/* 🔹 Product Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {products.map(({ id, title, desc, img, icon: Icon, link }) => (
            <div
              key={id}
              className={`relative group rounded-2xl overflow-hidden shadow-lg ${
                activeCardId === id ? "active-card" : ""
              }`}
              onTouchStart={() => handleTouchStart(id)}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={img}
                alt={title}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              {/* Blue bottom ribbon */}
              <div className="absolute bottom-0 left-0 w-full bg-blue-600 text-white flex items-center px-4 py-3 space-x-2">
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{title}</span>
              </div>

              {/* Hover/Touch Overlay */}
              <div
                className={`absolute inset-0 bg-blue-900/90 text-white transition-all duration-500 flex items-center justify-between p-6 ${
                  activeCardId === id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <Icon className="w-14 h-14 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="mb-3 text-sm text-gray-200">{desc}</p>
                  <Link
                    to={link}
                    className="inline-block px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Suggestion + Timeline */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Suggestion Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-10 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4">Why Choose GTCCU?</h3>
            <p className="text-lg mb-6 text-blue-100 leading-relaxed">
              We go beyond banking — we empower you with solutions that bring
              financial freedom, stability, and growth to your future.
            </p>
            <Link
              to="/about"
              className="inline-block px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-gray-200 transition"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Timeline Right */}
          <div ref={timelineRef} className="relative">
            {/* Animated Vertical Line */}
            <motion.div
              className="absolute left-6 top-0 w-1 bg-blue-500 origin-top"
              style={{ height: lineHeight }}
            />
            <div className="space-y-12 relative">
              {timeline.map(({ id, icon: Icon, title, desc }, idx) => {
                // Each step threshold
                const stepProgress = useTransform(
                  scrollYProgress,
                  [0, (idx + 1) / timeline.length],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start relative"
                  >
                    {/* Icon Circle */}
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10"
                      style={{
                        backgroundColor: stepProgress.get() > 0.5 ? "#1e40af" : "#e5e7eb", // Sleeker colors: deep blue when active, soft gray when inactive
                        color: stepProgress.get() > 0.5 ? "#fff" : "#1f2937", // White icon when active, dark gray when inactive
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    {/* Content */}
                    <div className="ml-6">
                      <h4 className="text-xl font-bold text-gray-800">
                        {title}
                      </h4>
                      <p className="text-gray-600 mt-1">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}