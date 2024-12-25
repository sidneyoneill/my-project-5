import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const StudentLandingPage = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const [path1, setPath1] = useState('');
  const [path2, setPath2] = useState('');

  useEffect(() => {
    const calculatePaths = () => {
      if (step1Ref.current && step2Ref.current && step3Ref.current) {
        const step1Rect = step1Ref.current.getBoundingClientRect();
        const step2Rect = step2Ref.current.getBoundingClientRect();
        const step3Rect = step3Ref.current.getBoundingClientRect();

        // Calculate relative positions
        const startX1 = step1Rect.left + step1Rect.width / 2;
        const startY1 = step1Rect.bottom;
        const endX1 = step2Rect.left + step2Rect.width / 2;
        const endY1 = step2Rect.top;

        const startX2 = step2Rect.left + step2Rect.width / 2;
        const startY2 = step2Rect.bottom;
        const endX2 = step3Rect.left + step3Rect.width / 2;
        const endY2 = step3Rect.top;

        // Create SVG paths
        setPath1(`M ${startX1} ${startY1} C ${startX1 + 100} ${startY1 + 50}, ${endX1 - 100} ${endY1 - 50}, ${endX1} ${endY1}`);
        setPath2(`M ${startX2} ${startY2} C ${startX2 - 100} ${startY2 + 50}, ${endX2 + 100} ${endY2 - 50}, ${endX2} ${endY2}`);
      }
    };

    calculatePaths();
    window.addEventListener('resize', calculatePaths);
    return () => window.removeEventListener('resize', calculatePaths);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Success!",
      description: "Thank you for signing up. We'll be in touch soon!",
    });
    console.log(values);
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <section className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-manrope tracking-tight">
            Kickstart Your Career Journey as a Student
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        className="h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-[#9b87f5]/80 to-[#7E69AB]/80 hover:from-[#9b87f5]/90 hover:to-[#7E69AB]/90 text-white animate-fade-in"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </section>

        {/* How It Works Section */}
        <section className="max-w-6xl mx-auto mt-32 relative overflow-hidden">
          {/* Background Curve */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M-100 400 C 200 400, 500 100, 800 400 S 1100 700, 1300 400"
                className="stroke-white/10 stroke-[6] fill-none animate-float"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 relative z-10">
            How It Works
          </h2>
          
          <div className="relative space-y-32 md:space-y-48">
            {/* Step 1 */}
            <div ref={step1Ref} className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm order-1 md:order-2">
                <span className="text-6xl text-white/20 font-bold">1</span>
              </div>
              <div className="text-center md:text-left max-w-sm order-2 md:order-1">
                <h3 className="text-xl font-semibold text-white mb-4">Create Your Profile</h3>
                <p className="text-white/70">
                  Build your personalized student profile and showcase your skills to stand out
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div ref={step2Ref} className="relative flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">2</span>
              </div>
              <div className="text-center md:text-right max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Explore Opportunities</h3>
                <p className="text-white/70">
                  Discover tailored career paths and learning opportunities that match your interests
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div ref={step3Ref} className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm order-1 md:order-2">
                <span className="text-6xl text-white/20 font-bold">3</span>
              </div>
              <div className="text-center md:text-left max-w-sm order-2 md:order-1">
                <h3 className="text-xl font-semibold text-white mb-4">Connect & Grow</h3>
                <p className="text-white/70">
                  Network with peers and mentors to accelerate your growth and achieve your goals
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentLandingPage;