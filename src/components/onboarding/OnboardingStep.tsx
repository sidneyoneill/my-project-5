import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PhoneNumberInput from './PhoneNumberInput';

interface OnboardingStepProps {
  currentStep: number;
}

const OnboardingStep = ({ currentStep }: OnboardingStepProps) => {
  const { data, updateData } = useOnboarding();
  const { toast } = useToast();
  const [countryCode, setCountryCode] = useState("+44");
  const [localPhoneNumber, setLocalPhoneNumber] = useState("");

  // Update the combined phone number whenever either part changes
  useEffect(() => {
    if (currentStep === 1) {
      const combinedNumber = `${countryCode} ${localPhoneNumber}`.trim();
      updateData("phoneNumber", combinedNumber);
    }
  }, [countryCode, localPhoneNumber, currentStep]);

  // Split the phone number when component mounts
  useEffect(() => {
    if (data.phoneNumber) {
      const match = data.phoneNumber.match(/^(\+\d+)\s*(.*)$/);
      if (match) {
        setCountryCode(match[1]);
        setLocalPhoneNumber(match[2]);
      }
    }
  }, []);

  const saveStepData = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error('No authenticated user found');
      }

      let updateData: any = {};

      switch (currentStep) {
        case 1:
          updateData = {
            phone_number: data.phoneNumber
          };
          break;
        case 2:
          updateData = {
            university_name: data.university.name || null,
            university_campus: data.university.campus || null
          };
          break;
        case 3:
          const degreeLength = data.degree.length ? parseInt(data.degree.length) : null;
          const currentYear = data.degree.currentYear ? parseInt(data.degree.currentYear) : null;
          
          updateData = {
            degree_name: data.degree.name || null,
            degree_title: data.degree.title || null,
            degree_length: !isNaN(degreeLength) ? degreeLength : null,
            current_year: !isNaN(currentYear) ? currentYear : null
          };

          console.log('Saving degree data:', updateData); // Debug log
          break;
        case 4:
          updateData = {
            industry_preferences: data.industryPreferences?.trim() || null
          };
          break;
        case 5:
          updateData = {
            role_preferences: data.rolePreferences?.trim() || null
          };
          break;
        case 6:
          updateData = {
            company_preferences: data.companyPreferences?.trim() || null
          };
          break;
      }

      console.log('Saving data to Supabase:', updateData); // Debug log

      const { error } = await supabase
        .from('students')
        .update(updateData)
        .eq('user_id', session.session.user.id);

      if (error) {
        console.error('Supabase error:', error); // Debug log
        throw error;
      }

    } catch (error) {
      console.error('Error saving step data:', error);
      toast({
        title: "Error saving data",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Save data when step changes or when data updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep > 0) {
        saveStepData();
      }
    }, 500); // Debounce the save

    return () => clearTimeout(timer);
  }, [currentStep, data]);

  const handleUniversityChange = (field: 'name' | 'campus', value: string) => {
    updateData('university', { ...data.university, [field]: value });
  };

  const handleDegreeChange = (field: keyof typeof data.degree, value: string) => {
    if (field === 'length' || field === 'currentYear') {
      const numericValue = value.replace(/[^\d]/g, '');
      updateData('degree', { ...data.degree, [field]: numericValue });
    } else {
      updateData('degree', { ...data.degree, [field]: value });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">Contact Details</h1>
              <p className="text-white/70">How can employers reach you?</p>
            </div>
            <PhoneNumberInput
              countryCode={countryCode}
              phoneNumber={localPhoneNumber}
              onCountryCodeChange={setCountryCode}
              onPhoneNumberChange={setLocalPhoneNumber}
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
                onChange={(e) => handleUniversityChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                placeholder="Campus (Optional)"
                value={data.university.campus}
                onChange={(e) => handleUniversityChange('campus', e.target.value)}
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
                onChange={(e) => handleDegreeChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                placeholder="Degree Title (e.g., BEng, MSc)"
                value={data.degree.title}
                onChange={(e) => handleDegreeChange('title', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                placeholder="Degree Length (e.g., 4 years)"
                value={data.degree.length}
                onChange={(e) => handleDegreeChange('length', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                placeholder="Current Year (e.g., Year 2)"
                value={data.degree.currentYear}
                onChange={(e) => handleDegreeChange('currentYear', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">Industry Preferences</h1>
              <p className="text-white/70">What industries are you interested in?</p>
            </div>
            <Textarea
              placeholder="Technology, Healthcare, Finance..."
              value={data.industryPreferences}
              onChange={(e) => updateData('industryPreferences', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">Role Preferences</h1>
              <p className="text-white/70">What sort of jobs are you interested in?</p>
            </div>
            <Textarea
              placeholder="Software Engineer, Data Analyst, Product Manager..."
              value={data.rolePreferences}
              onChange={(e) => updateData('rolePreferences', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">Company Preferences</h1>
              <p className="text-white/70">What types of companies interest you?</p>
            </div>
            <Textarea
              placeholder="Startups, Tech Giants, Consulting Firms..."
              value={data.companyPreferences}
              onChange={(e) => updateData('companyPreferences', e.target.value)}
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
