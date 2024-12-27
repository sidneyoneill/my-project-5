import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from "@/hooks/use-toast";
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';

const PhoneNumberPage = () => {
  const { data, updateData } = useOnboarding();
  const { toast } = useToast();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    updateData('phoneNumber', value);
  };

  const isValid = data.phoneNumber.length === 10;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Welcome to StudentHive</h1>
        <p className="text-white/70">Let's start with your phone number</p>
      </div>

      <div className="space-y-4">
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={data.phoneNumber}
          onChange={handlePhoneNumberChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          maxLength={10}
        />
      </div>

      {!isValid && (
        <p className="text-sm text-red-400">Please enter a valid 10-digit phone number</p>
      )}
    </div>
  );
};

const UniversityPage = () => {
  const { data, updateData } = useOnboarding();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Your University</h1>
        <p className="text-white/70">Tell us about where you study</p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="University Name (e.g., University of Bristol)"
          value={data.university.name}
          onChange={(e) => updateData('university', { ...data.university, name: e.target.value })}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <Input
          placeholder="Campus (Optional)"
          value={data.university.campus}
          onChange={(e) => updateData('university', { ...data.university, campus: e.target.value })}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
    </div>
  );
};

const DegreePage = () => {
  const { data, updateData } = useOnboarding();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Your Degree</h1>
        <p className="text-white/70">Tell us about your studies</p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Degree Name (e.g., Engineering Mathematics)"
          value={data.degree.name}
          onChange={(e) => updateData('degree', { ...data.degree, name: e.target.value })}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <Input
          placeholder="Degree Title (e.g., BEng, MSc)"
          value={data.degree.title}
          onChange={(e) => updateData('degree', { ...data.degree, title: e.target.value })}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <Input
          placeholder="Degree Length (e.g., 4 years)"
          value={data.degree.length}
          onChange={(e) => updateData('degree', { ...data.degree, length: e.target.value })}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <Input
          placeholder="Current Year (e.g., Year 2)"
          value={data.degree.currentYear}
          onChange={(e) => updateData('degree', { ...data.degree, currentYear: e.target.value })}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
    </div>
  );
};

const PreferencesPage = ({ type }: { type: 'industry' | 'role' | 'company' }) => {
  const { data, updateData } = useOnboarding();

  const config = {
    industry: {
      title: "Industry Preferences",
      description: "What industries are you interested in?",
      placeholder: "Technology, Healthcare, Finance",
      field: 'industryPreferences',
    },
    role: {
      title: "Role Preferences",
      description: "What sort of jobs are you interested in?",
      placeholder: "Internships, Part-time roles, Full-time positions",
      field: 'rolePreferences',
    },
    company: {
      title: "Company Preferences",
      description: "What sort of company types are you interested in?",
      placeholder: "Startups, SMEs, Corporations",
      field: 'companyPreferences',
    },
  }[type];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">{config.title}</h1>
        <p className="text-white/70">{config.description}</p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder={config.placeholder}
          value={data[config.field as keyof typeof data] as string}
          onChange={(e) => updateData(config.field as keyof typeof data, e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
        />
      </div>
    </div>
  );
};

const OnboardingContent = () => {
  const { currentStep, setCurrentStep, calculateProgress, data } = useOnboarding();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return data.phoneNumber.length === 10;
      case 2:
        return data.university.name.length > 0;
      case 3:
        return data.degree.name.length > 0 && data.degree.title.length > 0 &&
               data.degree.length.length > 0 && data.degree.currentYear.length > 0;
      case 4:
        return data.industryPreferences.length > 0;
      case 5:
        return data.rolePreferences.length > 0;
      case 6:
        return data.companyPreferences.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields before proceeding",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle completion
      toast({
        title: "Profile Complete!",
        description: "Your profile has been successfully set up",
      });
      navigate('/dashboard'); // Navigate to dashboard or appropriate page
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PhoneNumberPage />;
      case 2:
        return <UniversityPage />;
      case 3:
        return <DegreePage />;
      case 4:
        return <PreferencesPage type="industry" />;
      case 5:
        return <PreferencesPage type="role" />;
      case 6:
        return <PreferencesPage type="company" />;
      default:
        return null;
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

        {renderCurrentStep()}

        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 mt-6"
        >
          {currentStep === 6 ? "Complete" : "Next"}
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