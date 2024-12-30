import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface StudentProfile {
  name: string;
  phone_number: string | null;
  university_name: string | null;
  university_campus: string | null;
  degree_name: string | null;
  degree_title: string | null;
  degree_length: number | null;
  current_year: number | null;
  industry_preferences: string[];
  role_preferences: string[];
  company_preferences: string[];
  profile_complete: boolean;
  onboarding_completed_at: string | null;
}

export const useStudentProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data as StudentProfile;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<StudentProfile>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Convert number values to strings for JSON fields
      const formattedUpdates = {
        ...updates,
        industry_preferences: updates.industry_preferences?.map(String),
        role_preferences: updates.role_preferences?.map(String),
        company_preferences: updates.company_preferences?.map(String),
      };

      const { data, error } = await supabase
        .from("students")
        .update(formattedUpdates)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    updateProfile,
  };
};