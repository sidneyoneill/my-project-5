import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { SignupFormData } from '@/components/signup/signupSchema';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signup = async (values: SignupFormData) => {
    setIsLoading(true);
    try {
      // Attempt to sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            marketing_opt_in: values.marketing,
          },
        },
      });

      if (signUpError) {
        // Handle the user already exists error
        if (signUpError.message.includes('User already registered')) {
          toast({
            variant: 'destructive',
            title: 'Account already exists',
            description: 'Please try logging in instead.',
          });
          return;
        }
        throw signUpError;
      }

      if (!data.user?.id) {
        throw new Error('No user ID returned from signup');
      }

      // Create the student record
      const { error: studentError } = await supabase
        .from('students')
        .insert([
          {
            user_id: data.user.id,
            name: values.name,
          },
        ]);

      if (studentError) {
        // If student creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        throw studentError;
      }

      toast({
        title: 'Account created successfully!',
        description: 'Welcome to NexGen. Redirecting to onboarding...',
      });

      // Wait a moment before redirecting to ensure the toast is visible
      setTimeout(() => {
        navigate('/onboarding');
      }, 2000);
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Error creating account',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};