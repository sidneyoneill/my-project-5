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
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            marketing_opt_in: values.marketing,
          },
        },
      });

      if (error) throw error;

      if (!data.user?.id) {
        throw new Error('No user ID returned from signup');
      }

      const { error: studentError } = await supabase
        .from('students')
        .insert([
          {
            user_id: data.user.id,
            name: values.name,
          },
        ]);

      if (studentError) throw studentError;

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