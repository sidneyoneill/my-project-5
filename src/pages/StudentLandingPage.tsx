import React from 'react';
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
      </main>
    </div>
  );
};

export default StudentLandingPage;