import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/ParticleBackground";
import ProfileTabs from "@/components/profile/ProfileTabs";

const ProfilePage = () => {
  const navigate = useNavigate();

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

          {/* Welcome Message */}
          <h1 className="text-3xl font-bold text-white text-center">
            Welcome, Student
          </h1>

          {/* Profile Tabs */}
          <ProfileTabs />

          {/* Return to Home Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90"
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