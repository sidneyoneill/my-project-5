import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { Bell, Search, Pencil, Eye, Download, Upload } from 'lucide-react';
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

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile } = useStudentProfile();
  const [activeTab, setActiveTab] = useState("basic");

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
                      <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Upload New Resume</span>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="file" 
                        className="w-64 bg-white/10 border-white/20 text-white"
                        accept=".pdf,.doc,.docx"
                      />
                      <Button className="bg-white/10 border-white/20 text-white">
                        <Upload className="mr-2 h-4 w-4" /> Upload
                      </Button>
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