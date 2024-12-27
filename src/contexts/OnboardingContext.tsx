import React, { createContext, useContext, useState } from 'react';

interface OnboardingData {
  phoneNumber: string;
  university: {
    name: string;
    campus: string;
  };
  degree: {
    name: string;
    title: string;
    length: string;
    currentYear: string;
  };
  industryPreferences: string;
  rolePreferences: string;
  companyPreferences: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  calculateProgress: () => number;
}

const defaultData: OnboardingData = {
  phoneNumber: '',
  university: {
    name: '',
    campus: '',
  },
  degree: {
    name: '',
    title: '',
    length: '',
    currentYear: '',
  },
  industryPreferences: '',
  rolePreferences: '',
  companyPreferences: '',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const calculateProgress = () => {
    const totalFields = 9; // Total number of required fields across all pages
    let completedFields = 0;

    // Count completed fields
    if (data.phoneNumber) completedFields++;
    if (data.university.name) completedFields++;
    if (data.university.campus) completedFields++;
    if (data.degree.name) completedFields++;
    if (data.degree.title) completedFields++;
    if (data.degree.length) completedFields++;
    if (data.degree.currentYear) completedFields++;
    if (data.industryPreferences) completedFields++;
    if (data.rolePreferences) completedFields++;
    if (data.companyPreferences) completedFields++;

    return (completedFields / totalFields) * 100;
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        setCurrentStep,
        calculateProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};