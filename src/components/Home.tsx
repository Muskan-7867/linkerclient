import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen p-6 sm:p-10">
      {/* Left Content Section */}
      <div className="max-w-xl text-center lg:text-left mt-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#a3d5c6]">
          Create your personalized link tree and share all your important links in one place.
        </h1>
        <p className="text-base sm:text-lg text-[#a3d5c6] mb-6 mt-8">
          One link to help you share everything you create, curate, and sell from Instagram, TikTok, Twitter, YouTube, and more.
        </p>

        {/* Input Box & Button */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
          <Link to="/templates">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition w-full sm:w-auto">
              Claim your Linktree
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <img 
          src="./images/welcomeg.png"  
          alt="Mockup" 
          className="w-3/4 sm:w-1/2 lg:w-full max-w-md drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Home;
