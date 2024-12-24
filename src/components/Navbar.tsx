import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { BrainCircuit, Microchip, Network } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src="/lovable-uploads/1828cf96-2947-4655-82a7-b6fc8281a5e5.png" alt="Logo" className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
              <BrainCircuit className="w-5 h-5 text-primary-accent animate-glow" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/students" 
                className={`flex items-center space-x-2 relative px-2 py-1 transition-colors ${
                  isActive('/students') 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Network className="w-4 h-4" />
                <span>Students</span>
                {isActive('/students') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-accent to-secondary-accent animate-glow" />
                )}
              </Link>
              <Link 
                to="/employers" 
                className={`flex items-center space-x-2 relative px-2 py-1 transition-colors ${
                  isActive('/employers') 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Microchip className="w-4 h-4" />
                <span>Employers</span>
                {isActive('/employers') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-accent to-secondary-accent animate-glow" />
                )}
              </Link>
              <Link 
                to="/career-centers" 
                className={`flex items-center space-x-2 relative px-2 py-1 transition-colors ${
                  isActive('/career-centers') 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Network className="w-4 h-4" />
                <span>Career Centers</span>
                {isActive('/career-centers') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-accent to-secondary-accent animate-glow" />
                )}
              </Link>
              <Link 
                to="/company" 
                className={`flex items-center space-x-2 relative px-2 py-1 transition-colors ${
                  isActive('/company') 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Company</span>
                {isActive('/company') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-accent to-secondary-accent animate-glow" />
                )}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Log In
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary-accent to-secondary-accent hover:opacity-90 text-white shadow-lg hover:shadow-primary-accent/20 transition-all duration-300 rounded-xl"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;