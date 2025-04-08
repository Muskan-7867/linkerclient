import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 20; // 20 is the max tilt amount
      const y = ((e.clientY - top) / height - 0.5) * 20;
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#172a45] text-white overflow-x-hidden mt-20 md:mt-0">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:mt-[15rem] mt-8 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content Section - Order changes on mobile */}
        <div className="lg:w-1/2 w-full order-2 lg:order-1 mt-8 lg:mt-0 lg:pr-8 xl:pr-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            Share <span className="text-[#64ffda]">Everything</span> with One Link
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            Create your personalized link hub to connect your audience with all your important content, 
            products, and social profiles in one simple place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              to="/templates" 
              className="bg-[#64ffda] hover:bg-[#52e5c4] text-[#0a192f] font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-md transition duration-300 text-center transform hover:scale-105 text-sm sm:text-base"
            >
              Get Started for Free
            </Link>
            
           
          </div>

        </div>

        {/* Right Image Section - Order changes on mobile */}
        <div 
          className="lg:w-1/2 w-full order-1 lg:order-2 flex justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={imageRef}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            {/* Animated background elements - Hidden on smallest screens */}
            <div className="hidden sm:block absolute -top-8 -left-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#64ffda] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#0a5e7d] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="hidden sm:block absolute top-16 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#5a67d8] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div 
              className="relative w-full rounded-lg shadow-2xl transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${position.y * -1}deg) rotateY(${position.x}deg) scale(1.05)`,
                boxShadow: `${position.x * 2}px ${position.y * 2}px 30px rgba(100, 255, 218, 0.2)`
              }}
            >
              <img 
                src="./images/welcomeg.png"  
                alt="Linktree Mockup" 
                className="w-full rounded-lg"
              />
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: Math.sqrt(position.x * position.x + position.y * position.y) / 10,
                  background: `radial-gradient(circle at ${50 + position.x * 2}% ${50 + position.y * 2}%, rgba(100, 255, 218, 0.3), transparent 70%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Responsive grid */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Why Choose Our Platform
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Easy Setup",
              description: "Get your personalized link page ready in under 5 minutes",
              icon: "⚡"
            },
            {
              title: "Custom Branding",
              description: "Match your brand colors, fonts, and style",
              icon: "🎨"
            },
            {
              title: "Powerful Analytics",
              description: "Track clicks and visitor engagement",
              icon: "📊"
            },
            {
              title: "Mobile Friendly",
              description: "Looks great on all devices",
              icon: "📱"
            },
            {
              title: "Social Integration",
              description: "Connect all your social profiles",
              icon: "🔗"
            },
            {
              title: "Free Forever",
              description: "Basic plan with no hidden costs",
              icon: "💚"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-[#64ffda]/30 transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;