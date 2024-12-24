import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Empowering the Future of Careers with AI";
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
          className="relative inline-block text-primary-accent after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-primary-accent after:animate-glow"
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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-manrope tracking-tight">
            <span className="gradient-text">Nex</span>
            <span className="text-white">Gen</span>
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-manrope tracking-tighter">
            {highlightAI(displayText)}
            <span className={`inline-block w-1 h-12 bg-primary-accent ${isTypingComplete ? 'animate-glow opacity-0' : 'opacity-100'}`}>
              |
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8 font-manrope">
            Join the revolution in career development powered by artificial intelligence
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              className="bg-primary-accent hover:bg-primary-accent/90 text-white text-lg px-8 py-6 font-manrope"
            >
              For Students
            </Button>
            <Button 
              variant="outline" 
              className="text-white text-lg px-8 py-6 font-manrope hover:bg-white/10"
            >
              For Employers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;