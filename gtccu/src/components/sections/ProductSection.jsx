import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
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
  // 🔹 Mobile card overlay toggle
  const [activeCard, setActiveCard] = useState(null);

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

  // ─────────────────────────────────────────────────────────
  // TIMELINE: stop at last icon & light-up icons as line reaches
  // ─────────────────────────────────────────────────────────
  const timelineRef = useRef(null);
  const itemRefs = useRef([]); // refs for each timeline row
  const [lineMaxPx, setLineMaxPx] = useState(0); // pixel height to last icon center
  const [iconCenters, setIconCenters] = useState([]); // each icon center (px from container top)

  // Measure positions after layout (and on resize)
  useLayoutEffect(() => {
    const measure = () => {
      const container = timelineRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      const centers = itemRefs.current.filter(Boolean).map((rowEl) => {
        const iconEl = rowEl.querySelector(".timeline-icon");
        const target = iconEl || rowEl;
        const r = target.getBoundingClientRect();
        // distance from container top to icon center
        return r.top - containerRect.top + r.height / 2;
      });

      setIconCenters(centers);

      if (centers.length > 0) {
        // last icon center — the line should stop here
        setLineMaxPx(centers[centers.length - 1]);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll progress relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 80%"], // start near bottom of viewport, end near bottom
  });

  // Motion value: line height in px (0 → lineMaxPx)
  const lineHeightPxMV = useTransform(scrollYProgress, (v) => v * lineMaxPx);
  // String version for style
  const lineHeightPx = useTransform(
    lineHeightPxMV,
    (v) => `${Math.max(0, Math.min(v, lineMaxPx))}px`
  );

  // For lighting-up icons when the line passes them
  const [progressPx, setProgressPx] = useState(0);
  useMotionValueEvent(lineHeightPxMV, "change", (v) => {
    setProgressPx(v);
  });

  return (
    <section className="relative w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-blue-900">
          Our Products
        </h2>

        {/* 🔹 Product Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {products.map(({ id, title, desc, img, icon: Icon, link }) => {
            const isActive = activeCard === id;

            return (
              <div
                key={id}
                className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setActiveCard(isActive ? null : id)} // toggle on tap (mobile)
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

                {/* Overlay (desktop hover OR mobile active) */}
                <div
                  className={`
                    absolute inset-0 bg-blue-900/90 text-white flex items-center justify-between p-6
                    transition-all duration-500
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }
                  `}
                >
                  <Icon className="w-14 h-14 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="mb-3 text-sm text-gray-200">{desc}</p>
                    <Link
                      to={link}
                      className="inline-block px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
                      onClick={(e) => e.stopPropagation()} // don’t close when clicking link
                    >
                      Open Account
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
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
            {/* Animated Vertical Line (stops at last icon center) */}
            <motion.div
              className="absolute left-6 top-0 w-1 bg-blue-500 origin-top"
              style={{ height: lineHeightPx }}
            />

            <div className="space-y-12 relative">
              {timeline.map(({ id, icon: Icon, title, desc }, idx) => {
                // is this icon "reached" by the growing line?
                const reached =
                  iconCenters[idx] != null
                    ? progressPx >= iconCenters[idx]
                    : false;

                return (
                  <motion.div
                    key={id}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start relative"
                  >
                    {/* Icon Circle */}
                    <div
                      className={`timeline-icon flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                        reached
                          ? "bg-[#1e40af] text-white"
                          : "bg-[#e5e7eb] text-gray-700"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

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
