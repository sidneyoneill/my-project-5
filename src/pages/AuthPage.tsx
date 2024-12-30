import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ParticleBackground from "@/components/ParticleBackground";
import GoogleSignInButton from '@/components/signup/GoogleSignInButton';

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
            <div className="mb-6">
              <GoogleSignInButton />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-white/70 bg-[#0F172A]/50 backdrop-blur-xl">or continue with email</span>
              </div>
            </div>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#FFD700',
                      brandAccent: '#FF7F50',
                      inputBackground: 'rgba(255, 255, 255, 0.1)',
                      inputText: 'white',
                      inputPlaceholder: 'rgba(255, 255, 255, 0.5)',
                      inputBorder: 'rgba(255, 255, 255, 0.2)',
                      inputLabelText: 'white',
                      messageBackground: 'transparent',
                      defaultButtonBackground: 'transparent',
                      defaultButtonBackgroundHover: 'transparent'
                    }
                  }
                },
                style: {
                  button: {
                    background: 'linear-gradient(to right, #FF7F50, #FFD700)',
                    color: 'black',
                    fontWeight: '400',
                    borderRadius: '0.5rem',
                    width: '100%',
                    height: '40px',
                    '&:hover': {
                      background: 'linear-gradient(to right, rgba(255, 127, 80, 0.9), rgba(255, 215, 0, 0.9))',
                    }
                  },
                  anchor: {
                    display: 'none'
                  },
                  message: {
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    color: '#FF8B8B',
                    background: 'transparent',
                    border: 'none',
                    padding: '0'
                  },
                  container: {
                    '& .supabase-auth-ui_ui-message': {
                      background: 'transparent',
                      border: 'none', 
                      padding: '0',
                      color: '#FF8B8B'
                    }
                  }
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                  label: 'auth-label',
                  message: 'text-[#FF8B8B] bg-transparent border-none p-0'
                }
              }}
              providers={[]}
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