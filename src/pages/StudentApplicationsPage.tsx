import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentProfile } from '@/hooks/useStudentProfile';
import { Bell, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParticleBackground from '@/components/ParticleBackground';
import { Skeleton } from '@/components/ui/skeleton';
import Sidebar from '@/components/layouts/Sidebar';

// This would typically come from your database
const applications = [
  {
    id: 1,
    title: "Graduate Software Engineer",
    company: "Microsoft",
    location: "Manchester",
    status: "CV Submitted",
    nextStep: "Technical Interview",
    lastUpdated: "2024-03-15",
  },
];

const StudentApplicationsPage = () => {
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
            <h1 className="text-3xl font-bold text-white">My Applications</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Search applications..."
                className="w-[200px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          {/* Applications Tabs */}
          <Card className="backdrop-blur-xl bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="in-progress" className="w-full">
                <TabsList className="w-full justify-start bg-white/10">
                  <TabsTrigger 
                    value="in-progress"
                    className="text-white data-[state=active]:bg-white/20"
                  >
                    In Progress
                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">1</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applied"
                    className="text-white data-[state=active]:bg-white/20"
                  >
                    Applied
                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">1</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="action-needed"
                    className="text-white data-[state=active]:bg-white/20"
                  >
                    Action Needed
                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">1</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="connected"
                    className="text-white data-[state=active]:bg-white/20"
                  >
                    Connected
                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">1</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="in-progress">
                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold text-white mb-2">No Applications In Progress</h3>
                      <p className="text-white/70 mb-6">
                        Start exploring opportunities that match your profile
                      </p>
                      <Button 
                        onClick={() => navigate('/opportunities')}
                        className="bg-gradient-to-r from-[#FFD700] to-[#FF7F50] hover:opacity-90 text-black font-semibold"
                      >
                        View Opportunities
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 mt-6">
                      {applications.map((app) => (
                        <Card key={app.id} className="backdrop-blur-xl bg-white/5 border-white/10">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-white">{app.title}</h3>
                                <p className="text-white/70">
                                  {app.company} • {app.location}
                                </p>
                              </div>
                              <span className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm">
                                95% Match
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-white/70">Status</p>
                                <p className="text-white font-medium">{app.status}</p>
                              </div>
                              <div>
                                <p className="text-sm text-white/70">Next Step</p>
                                <p className="text-white font-medium">{app.nextStep}</p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-white/50">Last updated: {app.lastUpdated}</p>
                              <Button 
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                              >
                                View Details <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentApplicationsPage;