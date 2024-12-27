import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
}

const EditableField = ({ label, value, onSave }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-white/70">{label}</Label>
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="flex gap-2">
          <Input
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
          />
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#F59E0B] to-[#D97706]"
          >
            Save
          </Button>
        </div>
      ) : (
        <p className="text-white">{value}</p>
      )}
    </div>
  );
};

export default EditableField;