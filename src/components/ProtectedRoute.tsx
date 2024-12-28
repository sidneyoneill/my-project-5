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
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (!error && (!profile || !isProfileComplete(profile))) {
            navigate('/onboarding');
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

// Helper function to check if a profile is complete
const isProfileComplete = (profile: any) => {
  const requiredFields = [
    'phone_number',
    'university_name',
    'degree_name',
    'degree_length',
    'current_year',
    'industry_preferences',
    'role_preferences',
    'compnay_preferences'
  ];

  return requiredFields.every(field => profile[field] !== null && profile[field] !== '');
};

export default ProtectedRoute;