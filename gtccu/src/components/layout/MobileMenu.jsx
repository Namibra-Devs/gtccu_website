import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({ isOpen, onClose, navItems }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const simplifiedNavItems = navItems.map((item) => {
    if (item.name === "Join Now" && item.subItems) {
      return {
        ...item,
        subItems: item.subItems.map((subItem) => {
          if (subItem.name === "Open Account" && subItem.subItems) {
            return {
              name: "Open Account",
              path: "/join/open-account",
            };
          }
          return subItem;
        }),
      };
    }
    return item;
  });

  // ✅ Animation variants (reduced delayChildren)
  const circularContainerVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.05, // ⬅ reduced from 0.2
      },
    },
  };

  const circularItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      },
    },
  };

  const dropdownVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    open: {
      opacity: 1,
      height: "auto",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const backdropVariants = {
    closed: { opacity: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <motion.div
            variants={circularContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            // ✅ Changed gradient → solid blue
            className="fixed inset-0 h-screen w-screen bg-blue-900 text-white z-50 md:hidden overflow-y-auto"
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-8 border-b border-blue-700/30 backdrop-blur-lg"
              variants={circularItemVariants}
            >
              <div className="flex items-center space-x-4">
                <motion.img
                  src="/images/gtccu-logo.PNG"
                  alt="GTCCU Logo"
                  className="h-12 w-12"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                />
                <motion.span
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  GTCCU
                </motion.span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9, rotate: 90 }}
                whileHover={{ scale: 1.1 }}
                onClick={onClose}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <X size={28} />
              </motion.button>
            </motion.div>

            {/* Navigation */}
            <motion.ul className="p-8 space-y-4">
              {simplifiedNavItems.map((item, index) => (
                <motion.li key={index} variants={circularItemVariants}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggle(item.name)}
                        className="flex items-center justify-between w-full text-left py-4 px-6 rounded-xl hover:bg-blue-800/50 transition-colors backdrop-blur-sm border border-white/10"
                      >
                        <span className="text-xl font-semibold">
                          {item.name}
                        </span>
                        <motion.div
                          animate={{
                            rotate: openDropdown === item.name ? 180 : 0,
                          }}
                          transition={{ duration: 0.3, type: "spring" }}
                        >
                          <ChevronDown size={22} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.ul
                            variants={dropdownVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="ml-6 space-y-3 overflow-hidden mt-2"
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              <motion.li
                                key={subIndex}
                                variants={circularItemVariants}
                              >
                                <Link
                                  to={subItem.path}
                                  onClick={onClose}
                                  className="block py-3 px-6 rounded-lg hover:bg-blue-800/50 transition-colors text-lg font-medium backdrop-blur-sm border border-white/5"
                                >
                                  {subItem.name}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="block py-4 px-6 rounded-xl hover:bg-blue-800/50 transition-colors text-xl font-semibold backdrop-blur-sm border border-white/10"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
