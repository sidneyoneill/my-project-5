import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import OnboardingStep from '@/components/onboarding/OnboardingStep';

const OnboardingContent = () => {
  const { currentStep, setCurrentStep, calculateProgress } = useOnboarding();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to profile page on final step
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <ParticleBackground />
      
      <div className="w-full max-w-md space-y-8 p-6 animate-fade-in">
        <div className="w-full space-y-2">
          <Progress value={calculateProgress()} className="w-full h-2" />
          <p className="text-center text-sm text-white/70">Step {currentStep} of 6</p>
        </div>

        <OnboardingStep currentStep={currentStep} />

        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF7F50] hover:from-[#FFD700]/90 hover:to-[#FF7F50]/90 text-black font-semibold transition-all duration-300"
        >
          {currentStep === 6 ? "Complete Profile" : "Next"}
        </Button>
      </div>
    </div>
  );
};

const StudentOnboarding = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};

export default StudentOnboarding;