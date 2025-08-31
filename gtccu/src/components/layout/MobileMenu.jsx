import { Link } from "react-router-dom";
import { X, ChevronDown, Menu } from "lucide-react";
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Simplified nav items structure without nested dropdowns for "Open Account"
  const simplifiedNavItems = navItems.map(item => {
    if (item.name === "Join Now" && item.subItems) {
      return {
        ...item,
        subItems: item.subItems.map(subItem => {
          if (subItem.name === "Open Account" && subItem.subItems) {
            // Convert "Open Account" dropdown to a direct link
            return {
              name: "Open Account",
              path: "/join/open-account"
            };
          }
          return subItem;
        })
      };
    }
    return item;
  });

  // Circular animation variants
  const circularContainerVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const circularItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const renderMobileMenuItems = (items, level = 0) => {
    return items.map((item, index) => (
      <motion.li 
        key={index} 
        variants={circularItemVariants}
        className={level > 0 ? `pl-${level * 4}` : ""}
        custom={index}
      >
        {item.subItems ? (
          <>
            <button
              onClick={() => toggle(item.name)}
              className="flex items-center justify-between w-full text-left py-4 px-6 rounded-xl hover:bg-blue-800/50 transition-colors backdrop-blur-sm"
            >
              <span className="text-xl font-semibold">{item.name}</span>
              <motion.div
                animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
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
                  className="ml-6 space-y-3 overflow-hidden"
                >
                  {renderMobileMenuItems(item.subItems, level + 1)}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            to={item.path}
            onClick={onClose}
            className="block py-4 px-6 rounded-xl hover:bg-blue-800/50 transition-colors text-xl font-semibold backdrop-blur-sm"
          >
            {item.name}
          </Link>
        )}
      </motion.li>
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with enhanced animation */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Mobile Menu with Circular Animation */}
          <motion.div
            variants={circularContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-full bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white z-50 md:hidden"
            style={{
              background: "radial-gradient(circle at 100% 0%, #1e3a8a 0%, #1e40af 30%, #3730a3 70%, #5b21b6 100%)"
            }}
          >
            {/* Header with Logo and Close Button */}
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
                  transition={{ delay: 0.2, type: "spring" }}
                />
                <motion.span
                  className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  GTCCU
                </motion.span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9, rotate: 90 }}
                whileHover={{ scale: 1.1 }}
                onClick={onClose}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                aria-label="Close menu"
                variants={circularItemVariants}
              >
                <X size={28} />
              </motion.button>
            </motion.div>

            {/* Navigation Items with Staggered Animation */}
            <motion.ul 
              className="p-8 space-y-4 overflow-y-auto h-[calc(100%-96px)]"
            >
              {simplifiedNavItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  variants={circularItemVariants}
                  custom={index}
                >
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggle(item.name)}
                        className="flex items-center justify-between w-full text-left py-4 px-6 rounded-xl hover:bg-blue-800/50 transition-colors backdrop-blur-sm border border-white/10"
                      >
                        <span className="text-xl font-semibold">{item.name}</span>
                        <motion.div
                          animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
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
                              <motion.li key={subIndex} variants={circularItemVariants}>
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