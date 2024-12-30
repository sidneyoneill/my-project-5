import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [displayNexGen, setDisplayNexGen] = useState('');
  const fullText = "The AI job-matching platform";
  const nexGenText = "NexGen";
  const [isNexGenComplete, setIsNexGenComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= nexGenText.length) {
        setDisplayNexGen(nexGenText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsNexGenComplete(true);
        setTimeout(() => {
          setShowContent(true);
        }, 800);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const highlightAI = (text: string) => {
    return text.split(/(AI)/).map((part, index) => 
      part === 'AI' ? (
        <span 
          key={index}
          className="relative inline-block bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-transparent bg-clip-text"
        >
          {part}
        </span>
      ) : part
    );
  };

  const handleStudentClick = () => {
    navigate('/students');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="relative h-[70vh] flex flex-col items-center justify-center">
          <h1 
            className={`text-2xl md:text-4xl font-bold mb-1 font-manrope tracking-tight transition-all duration-700 absolute ${
              isNexGenComplete 
                ? 'transform -translate-y-16 top-[22%]'
                : 'transform translate-y-0 top-[50%] -translate-y-1/2'
            }`}
          >
            <span className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] inline-block text-transparent bg-clip-text">
              {displayNexGen.slice(0, 3)}
            </span>
            <span className="text-white">
              {displayNexGen.slice(3)}
            </span>
            <span className={`inline-block w-1 h-8 bg-[#FFD700] ${isNexGenComplete ? 'opacity-0' : 'opacity-100'}`}>
              |
            </span>
          </h1>
          
          <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-bold mb-16 font-manrope tracking-tighter max-w-[16ch] mx-auto leading-tight">
              {highlightAI(fullText)}
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                onClick={handleStudentClick}
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
    </div>
  );
};

export default Hero;