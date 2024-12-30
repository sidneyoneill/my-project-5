import { useStudentProfile } from "@/hooks/useStudentProfile";
import { CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";
import { Skeleton } from "@/components/ui/skeleton";

const BasicInfoSection = () => {
  const { profile, isLoading, updateProfile } = useStudentProfile();

  if (isLoading) {
    return (
      <CardContent className="space-y-6 p-6">
        <Skeleton className="h-[72px]" />
      </CardContent>
    );
  }

  const handleSave = async (field: string, value: string) => {
    await updateProfile.mutateAsync({ [field]: value });
  };

  return (
    <CardContent className="space-y-6 p-6">
      <EditableField
        label="Name"
        value={profile?.name || ''}
        onSave={(value) => handleSave('name', value)}
      />
      <EditableField
        label="Email"
        value={profile?.email || ''}
        disabled
      />
      <EditableField
        label="Phone Number"
        value={profile?.phone_number || ''}
        onSave={(value) => handleSave('phone_number', value)}
      />
    </CardContent>
  );
};

export default BasicInfoSection;