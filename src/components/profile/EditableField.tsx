import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave?: (value: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

const EditableField = ({ label, value, onSave, disabled = false, placeholder = '' }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    
    try {
      setIsSaving(true);
      await onSave(currentValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-white/70">{label}</Label>
        {!disabled && !isEditing && (
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
      {isEditing && !disabled ? (
        <div className="flex gap-2">
          <Input
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
            placeholder={placeholder}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-[#F59E0B] to-[#D97706]"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isSaving}
              className="border-white/10 text-white hover:bg-white/5"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-white">{value || placeholder}</p>
      )}
    </div>
  );
};

export default EditableField;