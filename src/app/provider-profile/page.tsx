
// src/app/provider-profile/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Save, Building, Phone, Mail, Globe, Image as ImageIcon, DollarSign, Award, Users2, ShieldCheck, ShieldAlert, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ALL_NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)", "Time-of-Flight Diffraction (TOFD)"
];

export default function ProviderProfilePage() {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [profileData, setProfileData] = useState({
    companyName: "",
    contactEmail: "",
    phone: "",
    website: "",
    address: "",
    bio: "",
    servicesOffered: [] as string[],
    certifications: [] as string[],
    personnelQualifications: [] as string[],
    availableDocuments: [] as string[], // Added
    serviceRadius: "",
    companyLogoUrl: "",
    baseRate: 0,
    pricingDetails: "",
    procedureInfo: "",
    acceptanceCriteriaInfo: "",
    isVerified: false,
  });

  const [certsText, setCertsText] = useState("");
  const [qualsText, setQualsText] = useState("");
  const [docsText, setDocsText] = useState(""); // Added

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/provider-profile");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    } else if (user && user.providerProfile) {
      setProfileData({
        companyName: user.name || "",
        contactEmail: user.email,
        phone: user.providerProfile.contactNumber || "",
        website: user.providerProfile.companyLogoUrl ? "" : "https://example.com", 
        address: user.providerProfile.location || "",
        bio: user.providerProfile.procedureInfo || "Update company bio here.", // Mapped bio to procedureInfo for now
        servicesOffered: user.providerProfile.servicesOffered || [],
        certifications: user.providerProfile.certifications || [],
        personnelQualifications: user.providerProfile.personnelQualifications || [],
        availableDocuments: user.providerProfile.availableDocuments || [], // Added
        serviceRadius: "", 
        companyLogoUrl: user.providerProfile.companyLogoUrl || "",
        baseRate: user.providerProfile.baseRate || 0,
        pricingDetails: user.providerProfile.pricingDetails || "",
        procedureInfo: user.providerProfile.procedureInfo || "",
        acceptanceCriteriaInfo: user.providerProfile.acceptanceCriteriaInfo || "",
        isVerified: user.providerProfile.isVerified || false,
      });
      setCertsText((user.providerProfile.certifications || []).join(", "));
      setQualsText((user.providerProfile.personnelQualifications || []).join(", "));
      setDocsText((user.providerProfile.availableDocuments || []).join(", ")); // Added
    }
  }, [user, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: name === "baseRate" ? parseFloat(value) || 0 : value
    }));
  };

  const handleServiceChange = (service: string) => {
    setProfileData(prev => {
      const newServices = prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter(s => s !== service)
        : [...prev.servicesOffered, service];
      return { ...prev, servicesOffered: newServices };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedCerts = certsText.split(',').map(s => s.trim()).filter(Boolean);
    const updatedQuals = qualsText.split(',').map(s => s.trim()).filter(Boolean);
    const updatedDocs = docsText.split(',').map(s => s.trim()).filter(Boolean); // Added

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.companyName, 
        providerProfile: {
          ...user.providerProfile,
          location: profileData.address,
          servicesOffered: profileData.servicesOffered,
          contactNumber: profileData.phone,
          companyLogoUrl: profileData.companyLogoUrl,
          baseRate: profileData.baseRate,
          pricingDetails: profileData.pricingDetails,
          procedureInfo: profileData.procedureInfo,
          acceptanceCriteriaInfo: profileData.acceptanceCriteriaInfo,
          certifications: updatedCerts,
          personnelQualifications: updatedQuals,
          availableDocuments: updatedDocs, // Added
          isVerified: profileData.isVerified, 
        },
      };
      setUser(updatedUser);
      localStorage.setItem('ndt-user', JSON.stringify(updatedUser));
    }

    toast({
      title: "Profile Updated",
      description: "Your NDT service provider profile has been successfully updated.",
    });
    setIsSubmitting(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><Activity className="h-8 w-8 animate-spin text-primary" /> <span className="ml-2">Loading profile...</span></div>;
  }

  if (!user || user.role !== 'provider') {
    return <div className="text-center py-10">Access Denied. This page is for service providers.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">Manage Your Provider Profile</CardTitle>
              <CardDescription>Keep your information up-to-date to attract clients and showcase your expertise.</CardDescription>
            </div>
            {profileData.isVerified ? (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                <ShieldCheck className="h-4 w-4 mr-2" /> Verified Provider
              </Badge>
            ) : (
              <Badge variant="destructive">
                <ShieldAlert className="h-4 w-4 mr-2" /> Not Verified
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName" className="flex items-center"><Building className="h-4 w-4 mr-2 text-muted-foreground"/>Company Name / Your Name</Label>
                <Input id="companyName" name="companyName" value={profileData.companyName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="contactEmail" className="flex items-center"><Mail className="h-4 w-4 mr-2 text-muted-foreground"/>Contact Email</Label>
                <Input id="contactEmail" name="contactEmail" type="email" value={profileData.contactEmail} onChange={handleInputChange} disabled />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center"><Phone className="h-4 w-4 mr-2 text-muted-foreground"/>Phone Number</Label>
                <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="website" className="flex items-center"><Globe className="h-4 w-4 mr-2 text-muted-foreground"/>Website (Optional)</Label>
                <Input id="website" name="website" type="url" value={profileData.website} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Full Address (Primary Operating Location)</Label>
              <Input id="address" name="address" value={profileData.address} onChange={handleInputChange} />
            </div>
             <div>
                <Label htmlFor="companyLogoUrl" className="flex items-center"><ImageIcon className="h-4 w-4 mr-2 text-muted-foreground"/>Company Logo URL (Optional)</Label>
                <Input id="companyLogoUrl" name="companyLogoUrl" type="url" placeholder="https://example.com/logo.png" value={profileData.companyLogoUrl} onChange={handleInputChange} />
                 <p className="text-xs text-muted-foreground mt-1">Direct link to your company logo image.</p>
              </div>

            <div>
              <Label htmlFor="bio">Company Bio / Overview</Label>
              <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} rows={4} placeholder="Describe your company, expertise, and experience..." />
            </div>

            <div>
              <Label>Services Offered</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 p-4 border rounded-md">
                {ALL_NDT_SERVICES.map(service => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service.replace(/[^a-zA-Z0-9]/g, "")}`}
                      checked={profileData.servicesOffered.includes(service)}
                      onCheckedChange={() => handleServiceChange(service)}
                    />
                    <label htmlFor={`service-${service.replace(/[^a-zA-Z0-9]/g, "")}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="certsText" className="flex items-center"><Award className="h-4 w-4 mr-2 text-muted-foreground"/>Certifications & Accreditations</Label>
              <Textarea id="certsText" name="certsText" value={certsText} onChange={(e) => setCertsText(e.target.value)} rows={3} placeholder="e.g., ISO 9001, DNV Approval, ABS Certified. Separate with commas." />
              <p className="text-xs text-muted-foreground mt-1">List company certifications, separated by commas.</p>
            </div>

            <div>
              <Label htmlFor="qualsText" className="flex items-center"><Users2 className="h-4 w-4 mr-2 text-muted-foreground"/>Personnel Qualifications</Label>
              <Textarea id="qualsText" name="qualsText" value={qualsText} onChange={(e) => setQualsText(e.target.value)} rows={3} placeholder="e.g., SNT-TC-1A Level II UT, NAS 410 Certified. Separate with commas." />
              <p className="text-xs text-muted-foreground mt-1">List key personnel qualifications, separated by commas.</p>
            </div>

            <div>
              <Label htmlFor="docsText" className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-muted-foreground"/>Available Technical Documents</Label>
              <Textarea id="docsText" name="docsText" value={docsText} onChange={(e) => setDocsText(e.target.value)} rows={3} placeholder="e.g., General Procedures Manual, ISO 9001 Certificate, Sample Technician Cert. Separate with commas." />
              <p className="text-xs text-muted-foreground mt-1">List types of technical documents you can provide (procedures, company certs, etc.), separated by commas.</p>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div> 
                  <Label htmlFor="serviceRadius">Service Radius</Label>
                  <Input id="serviceRadius" name="serviceRadius" value={profileData.serviceRadius} onChange={handleInputChange} placeholder="e.g., 50 miles, National" />
                </div>
                 <div>
                  <Label htmlFor="baseRate" className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-muted-foreground"/>Base Rate (e.g., per hour, optional)</Label>
                  <Input id="baseRate" name="baseRate" type="number" value={profileData.baseRate} onChange={handleInputChange} placeholder="e.g., 75" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <Label htmlFor="pricingDetails">Pricing Details</Label>
                    <Textarea id="pricingDetails" name="pricingDetails" value={profileData.pricingDetails} onChange={handleInputChange} rows={2} placeholder="Describe your general pricing structure, e.g., per hour, per inspection, project-based." />
                </div>
            </div>
            <div>
                <Label htmlFor="procedureInfo">Procedure Information</Label>
                <Textarea id="procedureInfo" name="procedureInfo" value={profileData.procedureInfo} onChange={handleInputChange} rows={3} placeholder="Briefly describe your general procedures or mention adherence to specific standards." />
            </div>
            <div>
                <Label htmlFor="acceptanceCriteriaInfo">Acceptance Criteria</Label>
                <Textarea id="acceptanceCriteriaInfo" name="acceptanceCriteriaInfo" value={profileData.acceptanceCriteriaInfo} onChange={handleInputChange} rows={3} placeholder="General acceptance criteria you adhere to or common standards used (e.g., API 1104, ASME B31.3)." />
            </div>

            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <> <Activity className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
              ) : (
                <> <Save className="mr-2 h-4 w-4" /> Save Profile </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
