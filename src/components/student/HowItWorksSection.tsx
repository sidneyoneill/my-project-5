import { ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Create Profile",
      description: "Build your professional profile highlighting your skills and aspirations"
    },
    {
      title: "AI Enhancement",
      description: "Our AI analyzes and enhances your profile for maximum impact"
    },
    {
      title: "Connect",
      description: "Match with employers looking for candidates like you"
    }
  ];

  return (
    <div className="relative py-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {steps.map((step, index) => (
          <>
            <div key={step.title} className="relative flex flex-col items-center text-center max-w-xs z-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF7F50] to-[#FFD700] flex items-center justify-center mb-4">
                <span className="text-black font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="hidden md:block relative z-10">
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
                  <ArrowRight 
                    size={32} 
                    className="text-[#FFD700] animate-pulse"
                  />
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      
      {/* Mobile arrows - vertical */}
      <div className="md:hidden flex flex-col items-center gap-4">
        {steps.slice(0, -1).map((_, index) => (
          <ArrowRight 
            key={index}
            size={24} 
            className="text-[#FFD700] rotate-90 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;