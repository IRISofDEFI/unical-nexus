import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { getSettings, updateSettings } from "../../services/settingsService";

const PortalSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    currentSession: "2024/2025",
    currentSemester: "First",
    admissionPortalOpen: true,
    courseRegOpen: true,
    resultUploadOpen: false,
    lateRegFee: "5000"
  });

  useEffect(() => {
    getSettings().then(setSettings).catch(() => toast({ title: "Error", description: "Failed to load settings" }));
  }, [toast]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSettings(settings);
      toast({ title: "Settings Saved", description: "Configuration updated." });
    } catch { toast({ title: "Error", description: "Save failed.", variant: "destructive" }); }
    finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Portal Settings" description="Configure global university portal settings">
      <div className="max-w-4xl space-y-6">
        {/* Academic Session Config */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Configuration</CardTitle>
            <CardDescription>Set current session and semester parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Current Session</Label>
                <Select value={settings.currentSession} onValueChange={v => setSettings({...settings, currentSession: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024/2025">2024/2025</SelectItem>
                    <SelectItem value="2023/2024">2023/2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Current Semester</Label>
                <Select value={settings.currentSemester} onValueChange={v => setSettings({...settings, currentSemester: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First">First Semester</SelectItem>
                    <SelectItem value="Second">Second Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portal Status Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Controls</CardTitle>
            <CardDescription>Toggle availability of student features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="text-base">Admission Portal</Label><p className="text-sm text-muted-foreground">Allow new students to apply and accept admission</p></div><Switch checked={settings.admissionPortalOpen} onCheckedChange={c => setSettings({...settings, admissionPortalOpen: c})} /></div>
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="text-base">Course Registration</Label><p className="text-sm text-muted-foreground">Allow students to register courses for current semester</p></div><Switch checked={settings.courseRegOpen} onCheckedChange={c => setSettings({...settings, courseRegOpen: c})} /></div>
            <div className="flex items-center justify-between"><div className="space-y-0.5"><Label className="text-base">Result Upload</Label><p className="text-sm text-muted-foreground">Enable lecturers to upload results</p></div><Switch checked={settings.resultUploadOpen} onCheckedChange={c => setSettings({...settings, resultUploadOpen: c})} /></div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PortalSettings;