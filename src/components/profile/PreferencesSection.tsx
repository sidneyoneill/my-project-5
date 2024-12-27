import { useOnboarding } from "@/contexts/OnboardingContext";
import { CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";

const PreferencesSection = () => {
  const { data, updateData } = useOnboarding();

  return (
    <CardContent className="space-y-6 p-6">
      <EditableField
        label="Industry Preferences"
        value={data.industryPreferences}
        onSave={(value) => updateData("industryPreferences", value)}
      />
      <EditableField
        label="Role Preferences"
        value={data.rolePreferences}
        onSave={(value) => updateData("rolePreferences", value)}
      />
      <EditableField
        label="Company Preferences"
        value={data.companyPreferences}
        onSave={(value) => updateData("companyPreferences", value)}
      />
    </CardContent>
  );
};

export default PreferencesSection;