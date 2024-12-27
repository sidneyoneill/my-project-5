import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ParticleBackground from "@/components/ParticleBackground";
import { useOnboarding } from "@/contexts/OnboardingContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();

  const handleFieldUpdate = (
    section: keyof typeof data,
    field: string,
    value: string
  ) => {
    if (section === "university") {
      updateData("university", { ...data.university, [field]: value });
    } else if (section === "degree") {
      updateData("degree", { ...data.degree, [field]: value });
    } else {
      updateData(section, value);
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Development Message */}
          <div className="bg-primary/20 backdrop-blur-lg border border-primary/10 rounded-xl p-4 text-center text-white">
            <p className="text-lg">
              We are currently building out the rest of the site. In the meantime,
              please check your emails and text messages for potential matches to jobs.
            </p>
          </div>

          {/* Profile Card */}
          <Card className="backdrop-blur-xl bg-black/30 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Basic Information */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold">Basic Information</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={data.phoneNumber}
                      onChange={(e) => handleFieldUpdate("phoneNumber", "", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </section>

              {/* University Details */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold">University Details</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="universityName">University Name</Label>
                    <Input
                      id="universityName"
                      value={data.university.name}
                      onChange={(e) => handleFieldUpdate("university", "name", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campus">Campus</Label>
                    <Input
                      id="campus"
                      value={data.university.campus}
                      onChange={(e) => handleFieldUpdate("university", "campus", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </section>

              {/* Degree Details */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold">Degree Details</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degreeName">Degree Name</Label>
                    <Input
                      id="degreeName"
                      value={data.degree.name}
                      onChange={(e) => handleFieldUpdate("degree", "name", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degreeTitle">Degree Title</Label>
                    <Input
                      id="degreeTitle"
                      value={data.degree.title}
                      onChange={(e) => handleFieldUpdate("degree", "title", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degreeLength">Degree Length</Label>
                    <Input
                      id="degreeLength"
                      value={data.degree.length}
                      onChange={(e) => handleFieldUpdate("degree", "length", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentYear">Current Year</Label>
                    <Input
                      id="currentYear"
                      value={data.degree.currentYear}
                      onChange={(e) => handleFieldUpdate("degree", "currentYear", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </section>

              {/* Preferences */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold">Job Preferences</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industryPreferences">Industry Preferences</Label>
                    <Input
                      id="industryPreferences"
                      value={data.industryPreferences}
                      onChange={(e) => handleFieldUpdate("industryPreferences", "", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="e.g., Technology, Healthcare, Finance"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rolePreferences">Role Preferences</Label>
                    <Input
                      id="rolePreferences"
                      value={data.rolePreferences}
                      onChange={(e) => handleFieldUpdate("rolePreferences", "", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="e.g., Internships, Part-time roles"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPreferences">Company Preferences</Label>
                    <Input
                      id="companyPreferences"
                      value={data.companyPreferences}
                      onChange={(e) => handleFieldUpdate("companyPreferences", "", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="e.g., Startups, SMEs, Corporations"
                    />
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Return to Home Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/")}
              className="w-full max-w-md"
              size="lg"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;