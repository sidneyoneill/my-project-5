import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { Bell, ChevronDown, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import ParticleBackground from '@/components/ParticleBackground';
import { Skeleton } from '@/components/ui/skeleton';
import Sidebar from '@/components/layouts/Sidebar';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { profile, isLoading } = useStudentProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen relative p-6">
        <ParticleBackground />
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex">
      <ParticleBackground />
      <Sidebar />
      
      <main className="flex-1 ml-64 px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
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

          {/* Dashboard Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Overview */}
            <Card className="col-span-2 backdrop-blur-xl bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-white">{profile?.name}</h3>
                    <p className="text-white/70">{profile?.email}</p>
                    <p className="text-white/70">{profile?.university_name || 'University not set'}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/profile')}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Edit Profile <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={75} className="w-full" />
                  <p className="text-sm text-white/70">75% Complete</p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => navigate('/profile')}
                  >
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Job Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Industries</h4>
                  <p className="text-sm text-white/70">{profile?.industry_preferences || 'Not set'}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Roles</h4>
                  <p className="text-sm text-white/70">{profile?.role_preferences || 'Not set'}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => navigate('/profile')}
                >
                  Update Preferences
                </Button>
              </CardContent>
            </Card>

            {/* University Details */}
            <Card className="col-span-2 backdrop-blur-xl bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">University Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">University</h4>
                    <p className="text-sm text-white/70">{profile?.university_name || 'Not set'}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Campus</h4>
                    <p className="text-sm text-white/70">{profile?.university_campus || 'Not set'}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Degree</h4>
                    <p className="text-sm text-white/70">{profile?.degree_name || 'Not set'}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Current Year</h4>
                    <p className="text-sm text-white/70">{profile?.current_year || 'Not set'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard; 