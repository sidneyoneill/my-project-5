import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  Gamepad2, 
  User, 
  Inbox,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Successfully logged out",
        description: "Come back soon!",
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/studentdashboard" },
    { icon: Target, label: "Opportunities", path: "/opportunities" },
    { icon: FileText, label: "Applications", path: "/applications" },
    { icon: Gamepad2, label: "Career Playground", path: "/career-playground" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-64 bg-black/30 backdrop-blur-xl border-r border-white/10">
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-[#FF7F50] to-[#FFD700] inline-block text-transparent bg-clip-text">
              Nex
            </span>
            <span className="text-white">Gen</span>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white"
            onClick={() => navigate('/inbox')}
          >
            <Inbox className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`w-full justify-start gap-2 ${
                isActive(item.path)
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;