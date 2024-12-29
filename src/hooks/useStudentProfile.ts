import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface StudentProfile {
  name: string;
  email: string | null;
  phone_number: string | null;
  university_name: string | null;
  university_campus: string | null;
  degree_name: string | null;
  degree_title: string | null;
  degree_length: number | null;
  current_year: number | null;
  industry_preferences: string | null;
  role_preferences: string | null;
  company_preferences: string | null;
}

export const useStudentProfile = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = useCallback(async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Failed to get session');
      }

      if (!session?.user?.id) {
        console.error('No authenticated user');
        return;
      }

      // Join students table with users table to get email
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          user:user_id (
            email
          )
        `)
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }

      // Restructure the data to match our interface
      const profileData: StudentProfile = {
        name: data.name,
        email: data.user?.email || null,
        phone_number: data.phone_number,
        university_name: data.university_name,
        university_campus: data.university_campus,
        degree_name: data.degree_name,
        degree_title: data.degree_title,
        degree_length: data.degree_length,
        current_year: data.current_year,
        industry_preferences: data.industry_preferences,
        role_preferences: data.role_preferences,
        company_preferences: data.company_preferences,
      };

      console.log('Fetched profile:', profileData); // Debug log
      setProfile(profileData);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: error.message || "Please try refreshing the page",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Subscribe to auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile();
      } else {
        setProfile(null);
      }
    });

    // Initial fetch
    fetchProfile();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        throw new Error('No authenticated user');
      }

      console.log('Updating profile with:', updates); // Debug log

      const { error } = await supabase
        .from('students')
        .update(updates)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      // Refetch profile to get updated data
      await fetchProfile();

      toast({
        title: "Profile updated",
        description: "Your changes have been saved",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  return { 
    profile, 
    isLoading, 
    refetchProfile: fetchProfile,
    updateProfile
  };
}; 