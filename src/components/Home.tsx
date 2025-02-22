import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      {/* Text Section */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-8 sm:mb-0 sm:mr-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 animate-fade-in">
          Welcome to LinkTree!
        </h1>
        <p className="text-lg sm:text-xl text-white mb-6 animate-fade-in">
          Create your personalized link tree and share all your important links in one place.
        </p>
        <Link to="/templates">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 animate-fade-in">
            Get Started
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="w-full sm:w-1/2 max-w-md animate-float">
        <img 
          src="src/assets/welcomeg.png" 
          alt="Welcome Illustration" 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Home;