import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";

const StudentOnboarding = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [progress, setProgress] = useState(16.67); // 100/6 pages = 16.67% per page
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setPhoneNumber(value);
  };

  const handleNext = () => {
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save the phone number
    console.log('Phone number submitted:', phoneNumber);
    toast({
      title: "Success!",
      description: "Phone number saved successfully",
    });
    // Navigate to next page (to be implemented)
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <ParticleBackground />
      
      <div className="w-full max-w-md space-y-8 p-6 animate-fade-in">
        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-center text-sm text-white/70">Step 1 of 6</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">Welcome to StudentHive</h1>
            <p className="text-white/70">Let's start with your phone number</p>
          </div>

          <div className="space-y-4">
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              maxLength={10}
            />

            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboarding;