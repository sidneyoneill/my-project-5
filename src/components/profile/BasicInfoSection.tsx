import { useOnboarding } from "@/contexts/OnboardingContext";
import { CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";

const BasicInfoSection = () => {
  const { data, updateData } = useOnboarding();

  return (
    <CardContent className="space-y-6 p-6">
      <EditableField
        label="Phone Number"
        value={data.phoneNumber}
        onSave={(value) => updateData("phoneNumber", value)}
      />
    </CardContent>
  );
};

export default BasicInfoSection;