"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Briefcase, Settings, Shield, Activity, BarChart, Image as ImageIcon, Save, ListChecks, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [homepageImage, setHomepageImage] = useState<string | null>(null);
  const [homepageImageFile, setHomepageImageFile] = useState<File | null>(null);
  const [providerImage, setProviderImage] = useState<string | null>(null);
  const [providerImageFile, setProviderImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState({
    homepage: false,
    provider: false,
    initial: true
  });

  const [metrics, setMetrics] = useState<{
    total_users: number;
    active_providers: number;
    open_requests: number;
    system_status: string;
  } | null>(null);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/admin/info');
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      toast({
        title: "Error",
        description: "Failed to load platform metrics",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/dashboard");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard");
    } else if (!loading && user && user.role === 'admin') {
      fetchMetrics();
      fetchSystemwideImages();
    } 
  }, [user, loading, router]);

  const fetchSystemwideImages = async () => {
    try {
      const response = await fetch('/api/admin/systemwide');
      if (response.ok) {
        const { data }  = await response.json();
        if (data?.find(n => n.id === 'homepage_image')) {
          setHomepageImage(`data:image/jpeg;base64,${data?.find(n => n.id === 'homepage_image')?.data}`);
        }
        if (data?.find(n => n.id === 'provider_image')) {
          setProviderImage(`data:image/jpeg;base64,${data?.find(n => n.id === 'provider_image')?.data}`);
        }
      }
    } catch (error) {
      console.error('Failed to fetch systemwide images:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, initial: false }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'homepage' | 'provider') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast({ title: "Invalid File", description: "Please upload an image file", variant: "destructive" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) { 
      toast({ title: "File Too Large", description: "Please upload an image smaller than 2MB", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (type === 'homepage') {
        setHomepageImage(result);
        setHomepageImageFile(file);
      } else {
        setProviderImage(result);
        setProviderImageFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = async (type: 'homepage' | 'provider') => {
    const image = type === 'homepage' ? homepageImage : providerImage;
    const file = type === 'homepage' ? homepageImageFile : providerImageFile;

    if (!image || !file) {
      toast({ title: "No Image", description: `Please select an image to upload as ${type === 'homepage' ? 'homepage' : 'provider'} image`, variant: "destructive" });
      return;
    }

    setIsLoading(prev => ({ ...prev, [type]: true }));

    try {
      const response = await fetch('/api/admin/systemwide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: type === 'homepage' ? 'homepage_image' : 'provider_image',
          data: image.split(',')[1] 
        }),
      });

      if (response.ok) {
        toast({ title: "Success", description: `${type === 'homepage' ? 'Homepage' : 'Provider'} image updated successfully` });
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(`Failed to save ${type} image:`, error);
      toast({ 
        title: "Error", 
        description: `Failed to update ${type === 'homepage' ? 'homepage' : 'provider'} image`, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  if (loading || isLoading.initial) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Activity className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading Admin Dashboard...</span>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-3xl text-primary">Administrator Dashboard</CardTitle>
              <CardDescription>Master control panel for NDT Connect.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Welcome, {user.name || user.email}! Use this panel to manage the platform.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Note: Image changes are saved to the server and will be visible to all users.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminActionCard
          title="Manage Users"
          description="View and manage client and service provider accounts."
          href="/admin/manage-users"
          icon={<Users className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="Manage Services"
          description="Oversee service categories, approvals, and quality standards."
          href="/admin/manage-services"
          icon={<Briefcase className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="Platform Settings"
          description="Configure global settings, fees, and platform parameters."
          href="/admin/platform-settings"
          icon={<Settings className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="View Analytics"
          description="Access platform usage statistics and reports."
          href="/admin/analytics"
          icon={<BarChart className="h-8 w-8 text-primary" />}
        />
        <AdminActionCard
          title="Manage Predefined Lists"
          description="View lists used for dropdowns and selections (e.g., NDT services, certifications)."
          href="/admin/manage-predefined-lists"
          icon={<ListChecks className="h-8 w-8 text-primary" />}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary"/>
              Manage Homepage Image
            </CardTitle>
            <CardDescription>Upload a custom image for the main homepage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              {homepageImage ? (
                <div className="w-full border rounded-lg overflow-hidden bg-muted/50">
                  <img 
                    src={homepageImage} 
                    alt="Homepage preview" 
                    className="w-full h-48 object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-muted/50 flex items-center justify-center rounded-lg">
                  <span className="text-muted-foreground">No homepage image set</span>
                </div>
              )}
              
              <div className="w-full flex flex-col items-center gap-2">
                <Label htmlFor="homepageImageUpload" className="cursor-pointer w-full">
                  <Button variant="outline" className="w-full" asChild>
                    <div>
                      <Upload className="mr-2 h-4 w-4" />
                      {homepageImage ? 'Change Image' : 'Upload Image'}
                    </div>
                  </Button>
                </Label>
                <Input 
                  id="homepageImageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'homepage')}
                />
                {homepageImageFile && (
                  <p className="text-sm text-muted-foreground">
                    {homepageImageFile.name} ({Math.round(homepageImageFile.size / 1024)}KB)
                  </p>
                )}
              </div>
            </div>
            <Button 
              onClick={() => handleSaveImage('homepage')} 
              className="w-full"
              disabled={!homepageImage || isLoading.homepage}
            >
              {isLoading.homepage ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Homepage Image
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary"/>
              Manage Default Provider Image
            </CardTitle>
            <CardDescription>Upload a default image for providers without their own logo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              {providerImage ? (
                <div className="w-full border rounded-lg overflow-hidden bg-muted/50">
                  <img 
                    src={providerImage} 
                    alt="Provider preview" 
                    className="w-full h-48 object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-muted/50 flex items-center justify-center rounded-lg">
                  <span className="text-muted-foreground">No provider image set</span>
                </div>
              )}
              
              <div className="w-full flex flex-col items-center gap-2">
                <Label htmlFor="providerImageUpload" className="cursor-pointer w-full">
                  <Button variant="outline" className="w-full" asChild>
                    <div>
                      <Upload className="mr-2 h-4 w-4" />
                      {providerImage ? 'Change Image' : 'Upload Image'}
                    </div>
                  </Button>
                </Label>
                <Input 
                  id="providerImageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'provider')}
                />
                {providerImageFile && (
                  <p className="text-sm text-muted-foreground">
                    {providerImageFile.name} ({Math.round(providerImageFile.size / 1024)}KB)
                  </p>
                )}
              </div>
            </div>
            <Button 
              onClick={() => handleSaveImage('provider')} 
              className="w-full"
              disabled={!providerImage || isLoading.provider}
            >
              {isLoading.provider ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Provider Image
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
          <CardDescription>Key metrics and system status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {metrics ? (
              <>
                <StatCard title="Total Users" value={metrics.total_users.toLocaleString()} icon={<Users className="h-5 w-5" />} />
                <StatCard title="Active Providers" value={metrics.active_providers.toLocaleString()} icon={<Briefcase className="h-5 w-5" />} />
                <StatCard title="Open Requests" value={metrics.open_requests.toLocaleString()} icon={<ListChecks className="h-5 w-5" />} />
                <StatCard title="System Status" value={metrics.system_status} icon={<Shield className="h-5 w-5" />} />
              </>
            ) : (
              Array(4).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex items-center justify-center h-full">
                    <Activity className="h-5 w-5 animate-spin" />
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <div className="p-6 border border-dashed rounded-lg text-center bg-muted/50">
            <p className="text-muted-foreground">[Analytics Dashboard Will Appear Here]</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface AdminActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

function AdminActionCard({ title, description, href, icon }: AdminActionCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 group">
      <CardHeader className="items-center text-center space-y-3">
        <div className="p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="min-h-[40px]">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>Manage {title.split(' ')[1]}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
