import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { LogIn } from "lucide-react";
import { SiGnuprivacyguard } from "react-icons/si";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#0a192f]/80 backdrop-blur-md w-[90vw] md:w-[80vw] absolute top-6 md:top-10 right-[5vw] md:right-[10vw] rounded-full p-4 md:p-5 border border-[#64ffda]/20 shadow-lg">
      <div className="container mx-auto px-2 md:px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center w-44">
          <img
            src="./images/treelogo.png"
            alt="Tree Logo"
            className="w-28 h-10 text-white md:w-24 lg:w-32 lg:h-12 md:h-20 hover:scale-105 transition-transform"
          />
        </Link>

        {/* Navigation Items - Desktop */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link 
              to="/templates" 
              className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300 font-medium"
            >
              Templates
            </Link>
          </li>
          <li>
            <Link to="/features" className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300 font-medium">
              Features
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300 font-medium">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button className="text-[#64ffda] hover:bg-[#64ffda]/10 px-4 py-2 rounded-md border border-[#64ffda] transition-all duration-300">
                Login
              </button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <button className="bg-[#64ffda] hover:bg-[#52e5c4] px-6 py-2 rounded-full text-[#0a192f] font-medium transition-all duration-300 transform hover:scale-105">
                Sign Up Free
              </button>
            </Link>
          </li>
        </ul>

        <div className="md:hidden flex items-center space-x-2">
          <Link 
            to="/login"
            className="p-2 hover:bg-[#64ffda]/10 rounded-full transition-colors duration-300"
            aria-label="Login"
          >
            <LogIn size={20} className="text-[#ccd6f6] hover:text-[#64ffda]" />
          </Link>
          <Link 
            to="/signup"
            className="p-2 hover:bg-[#64ffda]/10 rounded-full transition-colors duration-300"
            aria-label="Sign Up"
          >
            <SiGnuprivacyguard size={20} className="text-[#ccd6f6] hover:text-[#64ffda]" />
          </Link>
          <button 
            className="text-[#ccd6f6] p-2 hover:bg-[#64ffda]/10 rounded-full transition-colors duration-300"
            aria-label="Menu"
          >
            <FaBars className="w-5 h-5 hover:text-[#64ffda]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;