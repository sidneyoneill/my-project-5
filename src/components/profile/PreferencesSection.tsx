import { useStudentProfile } from "@/hooks/useStudentProfile";
import { CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";
import { Skeleton } from "@/components/ui/skeleton";

const PreferencesSection = () => {
  const { profile, isLoading, updateProfile } = useStudentProfile();

  if (isLoading) {
    return (
      <CardContent className="space-y-6 p-6">
        <Skeleton className="h-[200px]" />
      </CardContent>
    );
  }

  return (
    <CardContent className="space-y-6 p-6">
      <EditableField
        label="Industry Preferences"
        value={profile?.industry_preferences || ''}
        onSave={(value) => updateProfile({ industry_preferences: value })}
      />
      <EditableField
        label="Role Preferences"
        value={profile?.role_preferences || ''}
        onSave={(value) => updateProfile({ role_preferences: value })}
      />
      <EditableField
        label="Company Preferences"
        value={profile?.company_preferences || ''}
        onSave={(value) => updateProfile({ company_preferences: value })}
      />
    </CardContent>
  );
};

export default PreferencesSection;