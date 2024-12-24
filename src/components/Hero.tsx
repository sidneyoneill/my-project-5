import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Kickstart Careers with AI";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const highlightAI = (text: string) => {
    return text.split(/(AI)/).map((part, index) => 
      part === 'AI' ? (
        <span 
          key={index}
          className="relative inline-block bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-transparent bg-clip-text after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-[#FFD700] after:animate-glow"
        >
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold mb-1 font-manrope tracking-tight">
            <span className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] inline-block text-transparent bg-clip-text">Nex</span>
            <span className="text-white">Gen</span>
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-manrope tracking-tighter max-w-[12ch] mx-auto leading-tight">
            {highlightAI(displayText)}
            <span className={`inline-block w-1 h-12 bg-primary-accent ${isTypingComplete ? 'animate-glow opacity-0' : 'opacity-100'}`}>
              |
            </span>
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] hover:from-[#FF7F50]/90 hover:to-[#FFD700]/90 text-black text-lg px-8 py-6 font-manrope transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.7)]"
            >
              Students
            </Button>
            <Button 
              className="bg-black/30 backdrop-blur-xl text-white text-lg px-8 py-6 font-manrope transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:bg-black/80"
            >
              Employers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;