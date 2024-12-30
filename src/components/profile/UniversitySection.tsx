import { useStudentProfile } from "@/hooks/useStudentProfile";
import { CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";
import { Skeleton } from "@/components/ui/skeleton";

const UniversitySection = () => {
  const { profile, isLoading, updateProfile } = useStudentProfile();

  if (isLoading) {
    return (
      <CardContent className="space-y-6 p-6">
        <Skeleton className="h-[300px]" />
      </CardContent>
    );
  }

  const handleSave = async (field: string, value: string) => {
    const parsedValue = field.includes('_year') || field.includes('_length') 
      ? parseInt(value) || null 
      : value;
    await updateProfile.mutateAsync({ [field]: parsedValue });
  };

  return (
    <CardContent className="space-y-6 p-6">
      <EditableField
        label="University Name"
        value={profile?.university_name || ''}
        onSave={(value) => handleSave('university_name', value)}
      />
      <EditableField
        label="Campus"
        value={profile?.university_campus || ''}
        onSave={(value) => handleSave('university_campus', value)}
      />
      <EditableField
        label="Degree Name"
        value={profile?.degree_name || ''}
        onSave={(value) => handleSave('degree_name', value)}
      />
      <EditableField
        label="Degree Title"
        value={profile?.degree_title || ''}
        onSave={(value) => handleSave('degree_title', value)}
      />
      <EditableField
        label="Degree Length"
        value={profile?.degree_length?.toString() || ''}
        onSave={(value) => handleSave('degree_length', value)}
      />
      <EditableField
        label="Current Year"
        value={profile?.current_year?.toString() || ''}
        onSave={(value) => handleSave('current_year', value)}
      />
    </CardContent>
  );
};

export default UniversitySection;