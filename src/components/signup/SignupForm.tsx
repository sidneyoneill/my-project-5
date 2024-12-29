import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/UI/form';
import { Button } from '@/components/UI/button';
import { SignupFormFields } from './SignupFormFields';
import { signupFormSchema, type SignupFormData } from './signupSchema';
import { useSignup } from '@/hooks/useSignup';

const SignupForm = ({ initialEmail = '' }) => {
  const { signup, isLoading } = useSignup();
  
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: initialEmail,
      password: '',
      terms: false,
      marketing: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signup)} className="space-y-6">
        <SignupFormFields form={form} />
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FFD700] hover:from-[#FF7F50]/90 hover:to-[#FFD700]/90 text-black font-semibold"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;