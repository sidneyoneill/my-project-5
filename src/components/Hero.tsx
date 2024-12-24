import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Nex</span>
            <span className="text-white">Gen</span>
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Careers Start Here
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
            Empowering the Future of Careers with AI
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-primary-accent hover:bg-primary-accent/90 text-white text-lg px-8 py-6">
              For Students
            </Button>
            <Button variant="outline" className="text-white text-lg px-8 py-6">
              For Employers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;