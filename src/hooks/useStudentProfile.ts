import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface StudentProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
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
  created_at: string;
  updated_at: string;
}

export const useStudentProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("No user found");
      }

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      if (!data) {
        throw new Error("No profile found");
      }

      // Ensure arrays are initialized even if null in database
      return {
        ...data,
        email: user.email,
        industry_preferences: data.industry_preferences || [],
        role_preferences: data.role_preferences || [],
        company_preferences: data.company_preferences || [],
      } as StudentProfile;
    },
    retry: false,
    onError: (error) => {
      console.error("Profile fetch error:", error);
      toast({
        title: "Error loading profile",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
      // Optionally redirect to login if unauthorized
      if (error.message.includes("JWT")) {
        navigate("/auth");
      }
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<StudentProfile>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("students")
        .update(updates)
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
      console.error("Profile update error:", error);
      toast({
        title: "Error updating profile",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  };
};