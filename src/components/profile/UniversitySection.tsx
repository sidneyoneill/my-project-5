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

  return (
    <CardContent className="space-y-6 p-6">
      <EditableField
        label="University Name"
        value={profile?.university_name || ''}
        onSave={(value) => updateProfile({ university_name: value })}
      />
      <EditableField
        label="Campus"
        value={profile?.university_campus || ''}
        onSave={(value) => updateProfile({ university_campus: value })}
      />
      <EditableField
        label="Degree Name"
        value={profile?.degree_name || ''}
        onSave={(value) => updateProfile({ degree_name: value })}
      />
      <EditableField
        label="Degree Title"
        value={profile?.degree_title || ''}
        onSave={(value) => updateProfile({ degree_title: value })}
      />
      <EditableField
        label="Degree Length"
        value={profile?.degree_length?.toString() || ''}
        onSave={(value) => updateProfile({ degree_length: parseInt(value) || null })}
      />
      <EditableField
        label="Current Year"
        value={profile?.current_year?.toString() || ''}
        onSave={(value) => updateProfile({ current_year: parseInt(value) || null })}
      />
    </CardContent>
  );
};

export default UniversitySection;