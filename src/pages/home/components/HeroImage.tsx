import { useRef, useState } from "react";

const HeroImage = () => {
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
                    className="relative w-full rounded-lg shadow-xl transition-transform duration-300 ease-out"
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
    )
}

export default HeroImage