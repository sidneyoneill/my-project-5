import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ParticleBackground from "@/components/ParticleBackground";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/profile');
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          toast({
            title: "Successfully signed in!",
            description: "Redirecting to your profile...",
          });
          navigate('/profile');
        }
        if (event === "SIGNED_OUT") {
          navigate('/');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/70">Sign in to continue your journey</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#FFD700',
                      brandAccent: '#FF7F50',
                    }
                  }
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                }
              }}
              providers={["google"]}
              redirectTo={`${window.location.origin}/auth/callback`}
              onlyThirdPartyProviders={false}
              view="sign_in"
            />

            <p className="mt-4 text-center text-sm text-white/70">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[#FFD700] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;