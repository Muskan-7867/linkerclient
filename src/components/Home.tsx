import React from "react";
import { Link } from "react-router-dom";


const Home: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen  p-10">
      
      {/* Left Content Section */}
      <div className="max-w-xl text-center lg:text-left">
        <h1 className="text-5xl font-extrabold text-[#F1FF64] mb-6">
        Create your personalized link tree and share all your important links in one place.
        </h1>
        <p className="text-lg text-[#F1FF64] mb-6">
          One link to help you share 
          everything you create, curate, and sell from Instagram, TikTok, Twitter, YouTube, and more.
        </p>

        {/* Input Box & Button */}
        <div className="flex flex-col sm:flex-row gap-4">
         
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition">
            <Link to="/templates"> Claim your Linktree</Link>
           
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <img 
          src="src/assets/welcomeg.png"  
          alt="Mockup" 
          className="w-full max-w-md drop-shadow-2xl motion-rotate-in-[0.8turn]"
        />
      </div>
      
    </div>
  );
};

export default Home;
