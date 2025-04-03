import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { LogIn } from "lucide-react";
import { SiGnuprivacyguard } from "react-icons/si";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const navLinks = [
    { path: "/templates", name: "Templates" },
    { path: "/features", name: "Features" },
    { path: "/pricing", name: "Pricing" }
  ];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav className="bg-[#0a192f]/90 backdrop-blur-md w-[90vw] md:w-[80vw] absolute top-6 md:top-8 right-[5vw] md:right-[10vw] rounded-full p-3 md:p-4 border border-[#64ffda]/20 shadow-lg z-50">
      <div className="container mx-auto px-2 md:px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center w-44">
          <motion.img
            src="./images/treelogo.png"
            alt="Tree Logo"
            className="w-28 h-10 text-white md:w-24 lg:w-32 lg:h-12 md:h-20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </Link>

        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link, index) => (
            <li key={link.path}>
              <Link
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                to={link.path}
                className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300 font-medium relative group px-6 py-2"
              >
                <span className="relative z-20">{link.name}</span>
                {hovered === index && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 rounded-full z-10 bg-[#64ffda]/10 "
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/login">
              <motion.button
                className="text-[#64ffda] hover:bg-[#64ffda]/10 px-4 py-2 rounded-md border border-[#64ffda] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <motion.button
                className="bg-[#64ffda] hover:bg-[#52e5c4] px-6 py-2 rounded-full text-[#0a192f] font-medium transition-all duration-300 shadow-md hover:shadow-[#64ffda]/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up Free
              </motion.button>
            </Link>
          </li>
        </ul>

        <div className="md:hidden flex items-center space-x-3">
          <Link
            to="/login"
            className="p-2 hover:bg-[#64ffda]/10 rounded-full transition-colors duration-300"
            aria-label="Login"
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <LogIn size={20} className="text-[#ccd6f6] hover:text-[#64ffda]" />
            </motion.div>
          </Link>
          <Link
            to="/signup"
            className="p-2 hover:bg-[#64ffda]/10 rounded-full transition-colors duration-300"
            aria-label="Sign Up"
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <SiGnuprivacyguard size={20} className="text-[#ccd6f6] hover:text-[#64ffda]" />
            </motion.div>
          </Link>
          <button
            className="text-[#ccd6f6] p-2 hover:bg-[#64ffda]/10 rounded-full transition-colors duration-300"
            aria-label="Menu"
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <FaBars className="w-5 h-5 hover:text-[#64ffda]" />
            </motion.div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;