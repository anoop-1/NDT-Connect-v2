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
import { Activity, Save, Building, Phone, Mail, Globe } from "lucide-react";

const ALL_NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)", 
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)", 
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)", "Time-of-Flight Diffraction (TOFD)"
];

export default function ProviderProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock profile data
  const [profileData, setProfileData] = useState({
    companyName: "NDT Experts LLC",
    contactEmail: user?.email || "",
    phone: "(555) 123-4567",
    website: "https://ndtexperts.example.com",
    address: "123 Innovation Drive, Tech City, TX 77001",
    bio: "Providing top-tier NDT services for over 10 years. Specializing in aerospace and manufacturing sectors. Certified and experienced professionals.",
    servicesOffered: ["Ultrasonic Testing (UT)", "Radiographic Testing (RT)", "Visual Testing (VT)"],
    certifications: "ASNT Level III, ISO 9001",
    serviceRadius: "100 miles"
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/provider-profile");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    } else if (user) {
      // In a real app, fetch profile data here
      // For now, just update email if not set
      if (!profileData.contactEmail && user.email) {
        setProfileData(prev => ({ ...prev, contactEmail: user.email }));
      }
    }
  }, [user, loading, router, profileData.contactEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
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
          <CardTitle className="text-3xl">Manage Your Provider Profile</CardTitle>
          <CardDescription>Keep your information up-to-date to attract clients and showcase your expertise.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName" className="flex items-center"><Building className="h-4 w-4 mr-2 text-muted-foreground"/>Company Name</Label>
                <Input id="companyName" name="companyName" value={profileData.companyName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="contactEmail" className="flex items-center"><Mail className="h-4 w-4 mr-2 text-muted-foreground"/>Contact Email</Label>
                <Input id="contactEmail" name="contactEmail" type="email" value={profileData.contactEmail} onChange={handleInputChange} />
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
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" name="address" value={profileData.address} onChange={handleInputChange} />
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
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="certifications">Certifications & Qualifications</Label>
                  <Input id="certifications" name="certifications" value={profileData.certifications} onChange={handleInputChange} placeholder="e.g., ASNT Level III, ISO 9001" />
                </div>
                 <div>
                  <Label htmlFor="serviceRadius">Service Radius</Label>
                  <Input id="serviceRadius" name="serviceRadius" value={profileData.serviceRadius} onChange={handleInputChange} placeholder="e.g., 50 miles, National" />
                </div>
            </div>
            
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <> <Activity className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
              ) : (
                <> <Save className="mr-2 h-4 w-4" /> Save Profile </