import { useOnboarding } from "@/contexts/OnboardingContext";
import { CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";

const UniversitySection = () => {
  const { data, updateData } = useOnboarding();

  return (
    <CardContent className="space-y-6 p-6">
      <EditableField
        label="University Name"
        value={data.university.name}
        onSave={(value) => updateData("university", { ...data.university, name: value })}
      />
      <EditableField
        label="Campus"
        value={data.university.campus}
        onSave={(value) => updateData("university", { ...data.university, campus: value })}
      />
      <EditableField
        label="Degree Name"
        value={data.degree.name}
        onSave={(value) => updateData("degree", { ...data.degree, name: value })}
      />
      <EditableField
        label="Degree Title"
        value={data.degree.title}
        onSave={(value) => updateData("degree", { ...data.degree, title: value })}
      />
      <EditableField
        label="Degree Length"
        value={data.degree.length}
        onSave={(value) => updateData("degree", { ...data.degree, length: value })}
      />
      <EditableField
        label="Current Year"
        value={data.degree.currentYear}
        onSave={(value) => updateData("degree", { ...data.degree, currentYear: value })}
      />
    </CardContent>
  );
};

export default UniversitySection;