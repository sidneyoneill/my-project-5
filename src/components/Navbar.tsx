import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="fixed w-full glass-nav z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/lovable-uploads/1828cf96-2947-4655-82a7-b6fc8281a5e5.png" alt="Logo" className="h-8 w-auto" />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/students" className="text-white/80 hover:text-white transition-colors">Students</Link>
              <Link to="/employers" className="text-white/80 hover:text-white transition-colors">Employers</Link>
              <Link to="/career-centers" className="text-white/80 hover:text-white transition-colors">Career Centers</Link>
              <Link to="/company" className="text-white/80 hover:text-white transition-colors">Company</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Log In
            </Button>
            <Button className="bg-primary-accent hover:bg-primary-accent/90 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;