import { useStudentProfile } from "@/hooks/useStudentProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileCompletionBarProps {
  showButton?: boolean;
  className?: string;
}

const ProfileCompletionBar = ({ showButton = true, className = "" }: ProfileCompletionBarProps) => {
  const { profile } = useStudentProfile();
  const navigate = useNavigate();

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
    <Card className={`backdrop-blur-xl bg-white/5 border-white/10 ${className}`}>
      <CardContent className="py-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white">Profile Completion</span>
            <span className="text-white/70">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="w-full" />
          {showButton && (
            <Button 
              variant="outline" 
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/profile')}
            >
              Complete Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionBar;