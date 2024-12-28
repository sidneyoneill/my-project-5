import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen relative flex items-center justify-center">
      <ParticleBackground />
      <div className="w-full max-w-md p-8 bg-black/30 backdrop-blur-xl rounded-xl border border-white/10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] inline-block text-transparent bg-clip-text">
              Welcome to NexGen
            </span>
          </h1>
          <p className="text-white/70">Sign in or create an account to continue</p>
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
        />
      </div>
    </div>
  );
};

export default AuthPage;