import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // If user is logged in, redirect to profile page
        navigate('/profile');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar showAuthButtons={true} />
      <Hero />
    </div>
  );
};

export default Index;