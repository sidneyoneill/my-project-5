import React, { useRef } from 'react';
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Success!",
      description: "Thank you for signing up. We'll be in touch soon!",
    });
    console.log(values);
  };

  const highlightWord = (text: string, word: string) => {
    const regex = new RegExp(`(${word})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === word.toLowerCase() ? (
        <span 
          key={index}
          className="relative inline-block bg-gradient-to-r from-[#FF7F50] to-[#FFD700] text-transparent bg-clip-text"
        >
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <section className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-manrope tracking-tight max-w-[25ch] mx-auto">
            {highlightWord("Apply Smarter Not Harder", "smarter")}
          </h1>
          
          <div className="flex justify-center w-full max-w-[25ch] mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-4 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          className="h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl w-[250px]"
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
                  className="bg-gradient-to-r from-[#FFD700] to-[#FF7F50] hover:from-[#FFD700]/90 hover:to-[#FF7F50]/90 text-black px-4 py-2 font-manrope transition-all duration-300"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-6xl mx-auto mt-32 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 relative z-10">
            How It Works
          </h2>
          
          <div className="relative space-y-32 md:space-y-48">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">1</span>
              </div>
              <div className="text-center md:text-left max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Build Your Profile</h3>
                <p className="text-white/70">
                  Start by creating your personalized profile. Highlight your skills, achievements, and interests. No prior experience? No problem—showcase your potential instead!
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">2</span>
              </div>
              <div className="text-center md:text-left max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Let Us Know What You’re Looking For</h3>
                <p className="text-white/70">
                  Tell us the types of opportunities you’re interested in. Choose from part-time jobs, internships, or project-based roles. Share your preferences for industries, job types, and availability.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">3</span>
              </div>
              <div className="text-center md:text-left max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Get Matched Effortlessly</h3>
                <p className="text-white/70">
                  Sit back while our AI matching algorithms work for you. Receive tailored job suggestions based on your profile and goals. Skip the hassle and focus on applying to roles that are right for you.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">4</span>
              </div>
              <div className="text-center md:text-left max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Receive Notifications and Respond Quickly</h3>
                <p className="text-white/70">
                  Get notified instantly when you're matched with an opportunity. Respond to employers within **2 days** to confirm your interest. Stay proactive and make the most of your matches.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">5</span>
              </div>
              <div className="text-center md:text-left max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Have an Interview</h3>
                <p className="text-white/70">
                  Prepare for interviews with the support of our resources and tips. Connect with employers to showcase your skills and personality. Nail the interview and move closer to securing the role.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">6</span>
              </div>
              <div className="text-center md:text-left max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Land Your Job</h3>
                <p className="text-white/70">
                  Celebrate your success as you secure the perfect job or internship. Start gaining valuable experience to grow your career.
                </p>
              </div>
            </div>

            {/* Step 7 */}
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-6xl text-white/20 font-bold">7</span>
              </div>
              <div className="text-center md:text-left max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Receive Personalized Feedback</h3>
                <p className="text-white/70">
                  Get insights about roles where you were almost selected. Understand how you can improve for future opportunities. Leverage the feedback to refine your profile and grow professionally.
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