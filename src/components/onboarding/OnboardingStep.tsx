import React, { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OnboardingStepProps {
  currentStep: number;
}

const OnboardingStep = ({ currentStep }: OnboardingStepProps) => {
  const { data, updateData } = useOnboarding();
  const { toast } = useToast();

  // Save data to Supabase after each step
  const saveStepData = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) return;

    const updateData: any = {};

    switch (currentStep) {
      case 1:
        updateData.phone_number = data.phoneNumber;
        break;
      case 2:
        updateData.university_name = data.university.name;
        updateData.campus = data.university.campus;
        break;
      case 3:
        updateData.degree_name = data.degree.name;
        updateData.degree_length = parseInt(data.degree.length);
        updateData.current_year = parseInt(data.degree.currentYear);
        break;
      case 4:
        updateData.industry_preferences = data.industryPreferences;
        break;
      case 5:
        updateData.role_preferences = data.rolePreferences;
        break;
      case 6:
        updateData.compnay_preferences = data.companyPreferences;
        updateData.profile_complete = true;
        break;
    }

    const { error } = await supabase
      .from('students')
      .update(updateData)
      .eq('user_id', session.session.user.id);

    if (error) {
      console.error('Error saving step data:', error);
      toast({
        title: "Error saving data",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    saveStepData();
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">Welcome to StudentHive</h1>
              <p className="text-white/70">Let's start with your phone number</p>
            </div>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={data.phoneNumber}
              onChange={(e) => updateData('phoneNumber', e.target.value.replace(/[^\d]/g, ''))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              maxLength={10}
            />
          </div>
        );

      case 2:
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

      case 3:
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

      case 4:
      case 5:
      case 6:
        const config = {
          4: {
            title: "Industry Preferences",
            description: "What industries are you interested in?",
            placeholder: "Technology, Healthcare, Finance",
            field: 'industryPreferences',
          },
          5: {
            title: "Role Preferences",
            description: "What sort of jobs are you interested in?",
            placeholder: "Internships, Part-time roles, Full-time positions",
            field: 'rolePreferences',
          },
          6: {
            title: "Company Preferences",
            description: "What sort of company types are you interested in?",
            placeholder: "Startups, SMEs, Corporations",
            field: 'companyPreferences',
          },
        }[currentStep];

        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">{config.title}</h1>
              <p className="text-white/70">{config.description}</p>
            </div>
            <Textarea
              placeholder={config.placeholder}
              value={data[config.field as keyof typeof data] as string}
              onChange={(e) => updateData(config.field as keyof typeof data, e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return renderStep();
};

export default OnboardingStep;
