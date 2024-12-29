import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth');
          return;
        }

        // Only check profile completion if not already on onboarding page
        if (location.pathname !== '/onboarding') {
          const { data: profile, error } = await supabase
            .from('students')
            .select('profile_complete')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            console.error('Error checking profile:', error);
            navigate('/auth');
            return;
          }

          // If profile is not complete and user is not on onboarding page, redirect to onboarding
          if (!profile?.profile_complete && location.pathname !== '/onboarding') {
            navigate('/onboarding');
            return;
          }

          // If profile is complete and user tries to access onboarding, redirect to profile
          if (profile?.profile_complete && location.pathname === '/onboarding') {
            navigate('/profile');
            return;
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;