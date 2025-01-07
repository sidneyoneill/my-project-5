import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { StudentProfile } from '@/types/student';
import { Bell, Search, Pencil, Eye, Download, Upload, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import ParticleBackground from '@/components/ParticleBackground';
import { Skeleton } from '@/components/ui/skeleton';
import Sidebar from '@/components/layouts/Sidebar';
import BasicInfoSection from '@/components/profile/BasicInfoSection';
import UniversitySection from '@/components/profile/UniversitySection';
import PreferencesSection from '@/components/profile/PreferencesSection';
import ProfileCompletionBar from "@/components/profile/ProfileCompletionBar";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile } = useStudentProfile();
  const [activeTab, setActiveTab] = useState("basic");
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile?.cv_upload) {
      setCvUrl(profile.cv_upload);
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <ParticleBackground />
        <div className="space-y-6 p-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!profile) return 0;
    const fields = [
      profile.name,
      profile.email,
      profile.phone_number,
      profile.university_name,
      profile.university_campus,
      profile.degree_name,
      profile.degree_title,
      profile.degree_length,
      profile.current_year,
      profile.industry_preferences?.length > 0,
      profile.role_preferences?.length > 0,
      profile.company_preferences?.length > 0
    ];
    
    const completedFields = fields.filter(field => field).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.data.user.id}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('student_cvs')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = await supabase.storage
        .from('student_cvs')
        .getPublicUrl(fileName);

      const newCvUrl = urlData.publicUrl;
      
      updateProfile.mutate({ cv_upload: newCvUrl });
      setCvUrl(newCvUrl);

      toast({
        title: "Success",
        description: "CV uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload CV",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveCV = async () => {
    try {
      if (!cvUrl) return;

      // Extract the file name from the URL
      const fileName = cvUrl.split('/').pop();
      if (!fileName) throw new Error('Invalid file URL');

      // Delete the file from storage
      const { error: deleteError } = await supabase.storage
        .from('student_cvs')
        .remove([fileName]);

      if (deleteError) throw deleteError;

      // Update the profile to remove the CV reference
      updateProfile.mutate({ cv_upload: null });
      setCvUrl('');

      toast({
        title: "Success",
        description: "CV removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove CV",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative flex">
      <ParticleBackground />
      <Sidebar />
      
      <main className="flex-1 ml-64 px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Search..."
                className="w-[200px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          {/* Profile Progress */}
          <ProfileCompletionBar showButton={false} />

          {/* Profile Tabs */}
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full justify-start bg-white/10">
              <TabsTrigger value="basic" className="text-white data-[state=active]:bg-white/20">
                Basic
              </TabsTrigger>
              <TabsTrigger value="university" className="text-white data-[state=active]:bg-white/20">
                University & Degree
              </TabsTrigger>
              <TabsTrigger value="preferences" className="text-white data-[state=active]:bg-white/20">
                Job Preferences
              </TabsTrigger>
              <TabsTrigger value="resume" className="text-white data-[state=active]:bg-white/20">
                Resume
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <BasicInfoSection />
              </Card>
            </TabsContent>

            <TabsContent value="university">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">University & Degree</CardTitle>
                </CardHeader>
                <UniversitySection />
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Job Preferences</CardTitle>
                </CardHeader>
                <PreferencesSection />
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Resume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Current Resume</span>
                    <div className="flex items-center gap-2">
                      {cvUrl ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white"
                            onClick={() => window.open(cvUrl, '_blank')}
                          >
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white"
                            onClick={() => window.open(cvUrl, '_blank')}
                          >
                            <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white hover:bg-red-900/20"
                            onClick={handleRemoveCV}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        </>
                      ) : (
                        <span className="text-white/60">No resume uploaded yet</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Upload New Resume</span>
                    <div className="flex items-center gap-2">
                      <Input 
                        ref={fileInputRef}
                        type="file" 
                        className="w-64 bg-white/10 border-white/20 text-white"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                      {uploading ? (
                        <Button disabled className="bg-white/10 border-white/20 text-white">
                          Uploading...
                        </Button>
                      ) : (
                        <Button
                          className="bg-white/10 border-white/20 text-white"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" /> Upload
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;