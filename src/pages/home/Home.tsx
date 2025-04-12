import React from "react";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";

const Home: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#172a45] text-white overflow-x-hidden mt-20 md:mt-0">
      <HeroSection />

      {/* Features Section - Responsive grid */}
      <FeatureSection />
    </div>
  );
};

export default Home;