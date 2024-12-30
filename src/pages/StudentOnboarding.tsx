import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import OnboardingStep from '@/components/onboarding/OnboardingStep';
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from 'lucide-react';

const OnboardingContent = () => {
  const { currentStep, setCurrentStep, calculateProgress, data } = useOnboarding();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateRequiredFields = () => {
    const requiredFields = {
      phone_number: data.phoneNumber,
      university_name: data.university.name,
      degree_name: data.degree.name,
      degree_title: data.degree.title,
      industry_preferences: data.industryPreferences,
      role_preferences: data.rolePreferences,
      company_preferences: data.companyPreferences
    };

    console.log('Validating fields:', requiredFields); // Debug log

    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value.trim() === '')
      .map(([key]) => key);

    return emptyFields;
  };

  const handleNext = async () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      return;
    }

    try {
      // 1. Get user session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Failed to get user session');
      }

      if (!session?.user?.id) {
        throw new Error('No authenticated user found');
      }

      // 2. Validate fields
      const emptyFields = validateRequiredFields();
      console.log('Empty fields:', emptyFields); // Debug log

      if (emptyFields.length > 0) {
        toast({
          title: "Missing Information",
          description: `Please complete the following fields: ${emptyFields.join(', ')}`,
          variant: "destructive",
        });
        return;
      }

      // 3. Update the existing student record with all onboarding data
      const { error: updateError } = await supabase
        .from('students')
        .update({ 
          phone_number: data.phoneNumber,
          university_name: data.university.name,
          university_campus: data.university.campus,
          degree_name: data.degree.name,
          degree_title: data.degree.title,
          degree_length: data.degree.length ? parseInt(data.degree.length) : null,
          current_year: data.degree.currentYear ? parseInt(data.degree.currentYear) : null,
          industry_preferences: data.industryPreferences,
          role_preferences: data.rolePreferences,
          company_preferences: data.companyPreferences,
          profile_complete: true,
          onboarding_completed_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id);

      if (updateError) {
        console.error('Update error:', updateError);
        throw updateError;
      }

      // 4. Success! Navigate to profile
      toast({
        title: "Profile completed!",
        description: "Welcome to NexGen.",
      });
      
      navigate('/profile');
    } catch (error: any) {
      console.error('Complete profile error:', error);
      toast({
        title: "Error completing profile",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

        <div className="flex gap-4">
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`bg-gradient-to-r from-[#FFD700] to-[#FF7F50] hover:from-[#FFD700]/90 hover:to-[#FF7F50]/90 text-black font-semibold transition-all duration-300 ${currentStep === 1 ? 'w-full' : 'flex-1'}`}
          >
            {currentStep === 6 ? "Complete Profile" : "Next"}
          </Button>
        </div>
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
