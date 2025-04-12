

const FeatureSection = () => {
    const features = [
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
    ]
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 bg-white/10 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center lg:mb-[5rem] sm:mb-12">
      Why Choose Our Platform
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-14">
     {features.map((feature, index) => (
        <div 
          key={index}
          className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-[#64ffda]/30 transition-all duration-300 hover:shadow-xl flex justify-center items-center flex-col text-center"
        >
          <div className="text-3xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default FeatureSection