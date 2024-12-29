import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './UI/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = React.useState<any>(null);
  
  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Successfully logged out",
        description: "Come back soon!",
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group -mt-1">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] inline-block text-transparent bg-clip-text">Nex</span>
                <span className="text-white">Gen</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/students" 
                className={`relative px-1.5 py-0.5 text-sm transition-colors ${
                  isActive('/students') 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>Students</span>
                {isActive('/students') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-accent to-secondary-accent animate-glow" />
                )}
              </Link>
              <Link 
                to="/employers" 
                className={`relative px-1.5 py-0.5 text-sm transition-colors ${
                  isActive('/employers') 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>Employers</span>
                {isActive('/employers') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-accent to-secondary-accent animate-glow" />
                )}
              </Link>
              <Link 
                to="/about" 
                className={`relative px-1.5 py-0.5 text-sm transition-colors ${
                  isActive('/about') 
                    ? 'text-white' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>About Us</span>
                {isActive('/about') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-accent to-secondary-accent animate-glow" />
                )}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  className="h-7 text-white text-sm px-6 py-4 hover:text-white/80 transition-all duration-300"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </Button>
                <Button 
                  className="h-7 bg-gradient-to-r from-[#FF7F50] to-[#FFD700] hover:from-[#FF7F50]/90 hover:to-[#FFD700]/90 text-black text-sm px-6 py-4 shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-all duration-300"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="h-7 text-white text-sm px-6 py-4 hover:text-white/80 transition-all duration-300"
                  onClick={() => navigate('/auth')}
                >
                  Log In
                </Button>
                <Button 
                  className="h-7 bg-gradient-to-r from-[#FF7F50] to-[#FFD700] hover:from-[#FF7F50]/90 hover:to-[#FFD700]/90 text-black text-sm px-6 py-4 shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-all duration-300"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;