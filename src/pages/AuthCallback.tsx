import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        
        if (authError) throw authError;
        
        if (session) {
          // Check if student profile exists and is complete
          const { data: studentProfile, error: profileError } = await supabase
            .from('students')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }

          // If no profile exists or profile is incomplete, redirect to onboarding
          if (!studentProfile || !isProfileComplete(studentProfile)) {
            navigate('/onboarding');
            return;
          }

          // If profile exists and is complete, redirect to profile page
          navigate('/profile');
          toast({
            title: "Welcome back!",
            description: "You've been successfully signed in.",
          });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "There was a problem signing you in. Please try again.",
        });
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
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

export default AuthCallback;