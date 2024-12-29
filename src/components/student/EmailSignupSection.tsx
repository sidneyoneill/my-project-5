import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/UI/button';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof formSchema>;

const EmailSignupSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Handle form submission here
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <div className="w-full sm:w-2/3 relative">
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg p-2 border border-gray-300 bg-black/30 backdrop-blur-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
          />
          {errors.email && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
        
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-gradient-to-r from-[#FF7F50] to-[#FFD700] hover:from-[#FF7F50]/90 hover:to-[#FFD700]/90 text-black font-semibold px-8 py-2 shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-all duration-300"
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};

export default EmailSignupSection;