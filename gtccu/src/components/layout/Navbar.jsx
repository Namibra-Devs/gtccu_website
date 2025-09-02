import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import MobileMenu from "./MobileMenu";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRefs = useRef({});
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !Object.values(dropdownRefs.current).some((ref) =>
          ref && ref.contains(event.target)
        )
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Typewriter animation for GTCCU
  const text = "GTCCU";
  useEffect(() => {
    const typeAndDelete = async () => {
      while (true) {
        // Type animation
        for (let i = 0; i <= text.length; i++) {
          await controls.start({
            opacity: 1,
            transition: { duration: 0.1 },
            text: text.slice(0, i),
          });
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause at full text
        // Delete animation
        for (let i = text.length; i >= 0; i--) {
          await controls.start({
            opacity: 1,
            transition: { duration: 0.1 },
            text: text.slice(0, i),
          });
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        await new Promise((resolve) => setTimeout(resolve, 500)); // Pause before restart
      }
    };
    typeAndDelete();
  }, [controls, text]);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Join Now",
      id: "join-now",
      subItems: [
        { name: "Make an Enquiry", path: "/join/enquiry" }, 
        { name: "Open Account", path: "/join/open" }, 
       
      ],
    },
    {
      name: "Services",
      id: "services",
      subItems: [
        { name: "Savings", path: "/services/savings" },
        { name: "Loans", path: "/services/loans" },
        { name: "Investments", path: "/services/investments" },
        { name: "Shares", path: "/services/shares" },
      ],
    },
    {
      name: "About Us",
      id: "about-us",
      subItems: [
        { name: "Who We Are", path: "/about/who-we-are" },
        { name: "Our Team", path: "/about/team" },
        { name: "Our Board", path: "/about/board" },
        { name: "Our Bye-laws", path: "/about/byelaws" },
        { name: "Gallery", path: "/about/gallery" },
      ],
    },
    { name: "Contact Us", path: "/contact" },
    { name: "Reports", path: "/reports" },
    { name: "News", path: "/news" },
    { name: "Jobs", path: "/jobs" },
    { name: "Policies", path: "/policies" },
  ];

  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const renderDropdownItems = (items) => {
    return items.map((item, index) => (
      <NavLink
        key={index}
        to={item.path}
        className="block px-4 py-2 hover:bg-blue-100/50 hover:text-blue-600 transition-colors duration-200"
        onClick={() => setDropdownOpen(null)}
      >
        {item.name}
      </NavLink>
    ));
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg text-blue-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo + Company Name */}
        <NavLink to="/" className="flex items-center space-x-3">
          <motion.img
            src="/images/gtccu-logo.PNG"
            alt="GTCCU Logo"
            className="h-10 w-10"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.span
            className={`text-2xl font-bold tracking-tight ${
              scrolled ? "text-blue-900" : "text-white"
            }`}
            animate={controls}
            initial={{ text: "", opacity: 0 }}
          >
            {text}
          </motion.span>
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              ref={(el) => (dropdownRefs.current[item.id || index] = el)}
            >
              {item.subItems ? (
                <>
                  <button
                    className={`flex items-center gap-1 transition-colors duration-200 ${
                      scrolled ? "hover:text-blue-600" : "hover:text-blue-200"
                    }`}
                    onClick={() => handleDropdownToggle(item.id)}
                    aria-expanded={dropdownOpen === item.id}
                    aria-controls={`dropdown-${item.id}`}
                  >
                    {item.name}
                    <motion.div
                      animate={{ rotate: dropdownOpen === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-md text-gray-800 shadow-xl rounded-lg py-2 z-50 border-t-2 border-blue-300"
                        id={`dropdown-${item.id}`}
                        ref={(el) => (dropdownRefs.current[item.id] = el)}
                      >
                        {renderDropdownItems(item.subItems)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `transition-colors duration-200 ${
                      scrolled ? "hover:text-blue-600" : "hover:text-blue-200"
                    } ${
                      isActive
                        ? scrolled
                          ? "text-blue-600 underline underline-offset-4"
                          : "text-blue-200 underline underline-offset-4"
                        : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className={`md:hidden transition-colors duration-200 p-2 ${
            scrolled ? "text-blue-900 hover:text-blue-600" : "text-white hover:text-blue-200"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          <motion.div
            animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          navItems={navItems}
        />
      </div>
    </nav>
  );
}