import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <Hero />
    </div>
  );
};

export default Index;