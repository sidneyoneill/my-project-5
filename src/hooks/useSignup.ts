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
      // 1. Sign up the user
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

      try {
        // 2. Create initial student record
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            user_id: data.user.id,
            email: values.email,
            full_name: values.name,
            marketing_opt_in: values.marketing,
            profile_complete: false,
          });

        if (studentError) throw studentError;

        // 3. Show success message
        toast({
          title: 'Account created successfully!',
          description: 'Welcome to NexGen. Setting up your profile...',
        });

        // 4. Navigate to onboarding
        navigate('/onboarding');
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Still navigate to onboarding even if there's a database error
        navigate('/onboarding');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Error creating account',
        description: error.message || 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};