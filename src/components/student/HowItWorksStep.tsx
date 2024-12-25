import React from 'react';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  isReversed?: boolean;
  isLast?: boolean;
}

const HowItWorksStep = ({ number, title, description, isReversed = false, isLast = false }: HowItWorksStepProps) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-8 md:gap-16`}>
      <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
        <span className="text-6xl text-white/20 font-bold">{number}</span>
      </div>
      <div className={`text-center ${isReversed ? 'md:text-right' : 'md:text-left'} max-w-sm`}>
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
      {!isLast && (
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full h-32 w-4">
          <svg className="w-full h-full" viewBox="0 0 20 100">
            <path
              d={`M10 0 Q ${isReversed ? '0' : '20'} 50 10 100`}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              className="animate-draw-path"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HowItWorksStep;