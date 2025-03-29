import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
//navbar
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white w-[80vw] absolute top-10 right-[10vw] rounded-full p-7">
      <div className=" mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="./images/treelogo.png"
            alt="Tree Logo"
            className="w-20 h-18"
          />
        </Link>

        {/* Navigation Items */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link to="/templates" className="text-blue-500 hover:text-blue-700">
              Templates
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button className="bg-gray-200 hover:bg-blue-100 px-4 py-2 rounded-md text-blue-500 transition duration-200">
                Login
              </button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <button className="bg-blue-600 hover:bg-blue-300 px-4 py-2 rounded-[60px] text-white hover:text-blue-500">
                Sign Up Free
              </button>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-300 px-4 py-2 rounded-[60px] text-white hover:text-blue-500 transition duration-200">
              Sign Up Free
            </button>
          </Link>
          <Link to="/templates" className="text-blue-500">
            <FaBars className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;