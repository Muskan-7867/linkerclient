
import { Link } from "react-router-dom";
import HeroImage from "./HeroImage";


const HeroSection = () => {
   return (
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
            <HeroImage />
        </div>
    )
}

export default HeroSection