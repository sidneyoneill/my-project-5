import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import BasicInfoSection from "./BasicInfoSection";
import UniversitySection from "./UniversitySection";
import PreferencesSection from "./PreferencesSection";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
        <TabsTrigger value="basic" className="data-[state=active]:bg-white/10">
          Basic
        </TabsTrigger>
        <TabsTrigger value="university" className="data-[state=active]:bg-white/10">
          University & Degree
        </TabsTrigger>
        <TabsTrigger value="preferences" className="data-[state=active]:bg-white/10">
          Job Preferences
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <Card className="backdrop-blur-xl bg-black/30 border-white/10">
          <BasicInfoSection />
        </Card>
      </TabsContent>

      <TabsContent value="university">
        <Card className="backdrop-blur-xl bg-black/30 border-white/10">
          <UniversitySection />
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card className="backdrop-blur-xl bg-black/30 border-white/10">
          <PreferencesSection />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;