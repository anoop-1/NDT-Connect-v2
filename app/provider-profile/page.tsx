"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Save, Building, Mail, Globe, ImageIcon, ListChecks, PlusCircle, Trash2, PenTool, CalendarIcon, Users2, Award, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProviderUser } from '../../lib/types';

const CURRENCIES = [ "USD", "EUR", "GBP", "INR", "CAD", "AUD", "JPY", "CNY", "CHF", "AED", "SGD", "BRL", "ZAR", "SAR", "QAR", "OMR", "KWD", "BHD" ];
const PREDEFINED_NDT_SERVICES_TABLE = [ "Radiographic Testing", "Ultrasonic Testing", "Magnetic Particle Testing", "Liquid Penetrant Testing", "Visual Testing", "Eddy Current Testing" ];
const SERVICE_UNITS = [ "per hour", "per day", "per project", "per item" ];
const COMPANY_CERTIFICATIONS = [ "ISO 9001", "API Q1", "Nadcap", "AS9100" ];
const QUALIFICATION_BODIES = [ "ASNT", "PCN", "ISO 9712", "CSWIP" ];
const QUALIFICATION_LEVELS = ["Level I", "Level II", "Level III", "Technician"];

const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export default function ProviderProfilePage() {
  const { user, loading, updateUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<ProviderUser | null>(null);

  useEffect(() => {
    console.log('Auth state:', { user, loading });
    if (!loading && !user) {
      console.log('Redirecting to login...');
      router.push("/login?redirect=/provider-profile");
      return;
    }

    if (user && user.role !== 'provider') {
      console.log('Redirecting to dashboard...');
      router.push("/dashboard");
      return;
    }

    if (user) {
      console.log('Setting up profile for user:', user.email);
      // Create a deep copy for local form state to avoid direct mutation
      const userCopy = JSON.parse(JSON.stringify(user));

      // Ensure providerProfile exists with proper defaults
      if (!userCopy.providerProfile) {
        userCopy.providerProfile = {
          companyName: '',
          location: '',
          contactNumber: '',
          description: '',
          specialization: '',
          companyLogoUrl: '',
          procedureInfoUrl: '',
          rating: 0,
          servicesOffered: [],
          certifications: [],
          personnelQualifications: []
        };
      }

      // Ensure arrays exist and have at least one item
      if (!userCopy.providerProfile.servicesOffered || userCopy.providerProfile.servicesOffered.length === 0) {
        userCopy.providerProfile.servicesOffered = [
          { id: generateUniqueId(), name: '', rate: '', unit: '', currency: 'USD', tax: '' }
        ];
      }

      if (!userCopy.providerProfile.certifications || userCopy.providerProfile.certifications.length === 0) {
        userCopy.providerProfile.certifications = [
          { id: generateUniqueId(), name: '', category: '' }
        ];
      }

      if (!userCopy.providerProfile.personnelQualifications || userCopy.providerProfile.personnelQualifications.length === 0) {
        userCopy.providerProfile.personnelQualifications = [
          { id: generateUniqueId(), quantity: 1, certificationBody: '', level: '' }
        ];
      }

      setProfile(userCopy as ProviderUser);
    }
  }, [user, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!profile) return;
    const path = name.split('.');
    
    // Simple deep setter for one level (e.g., providerProfile.location)
    if (path.length === 2) {
        setProfile({
            ...profile,
            [path[0]]: {
                ...(profile as any)[path[0]],
                [path[1]]: value,
            }
        } as ProviderUser);
    } else {
        setProfile({ ...profile, [name]: value } as ProviderUser);
    }
  };
  
  const handleNestedTextAreaChange = (field: 'description' | 'specialization', value: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      [field]: value,
    } as ProviderUser);
  };

  const handleNestedChange = (field: keyof ProviderUser, value: any) => {
    if (!profile) return;
    setProfile({
      ...profile,
      [field]: value,
    } as ProviderUser);
  };

  const handleDynamicListChange = (listName: 'servicesOffered' | 'personnelQualifications' | 'certifications', id: string, field: string, value: any) => {
      if (!profile) return;
      const list = (profile[listName] as any[]) || [];
      const updatedList = list.map((item: any) => 
          item.id === id ? { ...item, [field]: value } : item
      );
      handleNestedChange(listName, updatedList);
  };
  
  const addDynamicListItem = (listName: 'servicesOffered' | 'personnelQualifications' | 'certifications') => {
      if (!profile) return;
      let newItem: any;
      if (listName === 'servicesOffered') {
        newItem = { id: generateUniqueId(), name: '', rate: '', unit: '', currency: 'USD', tax: '' };
      } else if (listName === 'personnelQualifications') {
        newItem = { id: generateUniqueId(), quantity: 1, certificationBody: '', level: '' };
      } else {
        newItem = { id: generateUniqueId(), name: '', category: '' };
      }
      const currentList = (profile[listName] as any[]) || [];
      const updatedList = [...currentList, newItem];
      handleNestedChange(listName, updatedList);
  };

  const removeDynamicListItem = (listName: 'servicesOffered' | 'personnelQualifications' | 'certifications', id: string) => {
      if (!profile) return;
      const currentList = (profile[listName] as any[]) || [];
      if (currentList.length <= 1 && (listName === 'servicesOffered' || listName === 'personnelQualifications')) {
          toast({ 
            title: "Cannot Remove", 
            description: "At least one item is required.", 
            variant: "destructive" 
          });
          return;
      }
      const updatedList = currentList.filter((item: any) => item.id !== id);
      handleNestedChange(listName, updatedList);
  };


  const geocodeLocation = async (locationStr: string): Promise<{ lat: number; lng: number } | null> => {
    if (!locationStr || locationStr.trim().length < 3) return null;
    try {
      const encoded = encodeURIComponent(locationStr.trim());
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`,
        { headers: { 'User-Agent': 'NDT-Connect/1.0 (info@ndt-connect.com)' } }
      );
      const results = await res.json();
      if (results && results.length > 0) {
        return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
      }
    } catch {
      // geocoding failure is non-fatal
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    setIsSubmitting(true);
    try {
        // Geocode the location if it changed
        let geoCoords: { lat: number; lng: number } | null = null;
        if (profile.location && profile.location.trim()) {
          geoCoords = await geocodeLocation(profile.location);
        }

        const profileToSave = {
          ...profile,
          ...(geoCoords ? { lat: geoCoords.lat, lng: geoCoords.lng } : {}),
        };

        await updateUser(profileToSave);
        toast({
            title: "Profile Updated",
            description: geoCoords
              ? `Profile saved. Location geocoded to (${geoCoords.lat.toFixed(4)}, ${geoCoords.lng.toFixed(4)}) — you'll appear on the map.`
              : "Profile saved successfully.",
        });
    } catch (error: any) {
        console.error("Error updating profile:", error);
        toast({ title: "Update Failed", description: "Could not save your profile.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Activity className="h-8 w-8 animate-spin text-primary" /> 
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="text-center">
          <p className="text-lg mb-4">Please log in to access your provider profile.</p>
          <Button onClick={() => router.push("/login?redirect=/provider-profile")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Activity className="h-8 w-8 animate-spin text-primary" /> 
        <span className="ml-2">Setting up profile...</span>
      </div>
    );
  }
  
  return (
    <div className="w-full flex justify-center py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-8">
        <fieldset disabled={isSubmitting} className="space-y-6 group">
          <Card className="shadow-lg group-disabled:opacity-50">
            <CardHeader>
              <CardTitle className="text-3xl">Manage Your Provider Profile</CardTitle>
              <CardDescription>This information is stored in Firestore and visible to clients.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><Label htmlFor="companyName">Company Name</Label><Input id="companyName" name="companyName" value={profile.companyName || ''} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="name">Contact Person Name</Label><Input id="name" name="name" value={profile.name} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="email">Contact Email</Label><Input id="email" name="email" type="email" value={profile.email} disabled /></div>
                  <div><Label htmlFor="contactNumber">Phone</Label><Input id="contactNumber" name="contactNumber" value={profile.contactNumber || ''} onChange={handleInputChange} /></div>
                  <div><Label htmlFor="location">Location</Label><Input id="location" name="location" value={profile.location || ''} onChange={handleInputChange} /></div>
               </div>
               <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea id="description" placeholder="A brief description of your company, its history, and expertise." value={profile.description || ''} onChange={(e) => handleNestedTextAreaChange('description', e.target.value)} />
               </div>
               <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" placeholder="e.g., Aerospace, Oil & Gas, Weld Inspection" value={profile.specialization || ''} onChange={(e) => handleNestedTextAreaChange('specialization', e.target.value)} />
               </div>
               {/* Company/Profile Image URL */}
               <div>
                  <Label htmlFor="companyLogoUrl" className="flex items-center">
                      <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                      Company/Profile Image URL
                  </Label>
                  <Input 
                      id="companyLogoUrl" 
                      name="companyLogoUrl" 
                      value={profile.companyLogoUrl || ''} 
                      onChange={handleInputChange}
                      placeholder="https://example.com/logo.png"
                  />
               </div>
               {/* Procedures URL */}
               <div>
                  <Label htmlFor="procedureInfoUrl" className="flex items-center">
                      <PenTool className="mr-2 h-4 w-4 text-muted-foreground"/>
                      Bio / Procedures URL
                  </Label>
                  <Input 
                      id="procedureInfoUrl" 
                      name="procedureInfoUrl" 
                      value={profile.procedureInfoUrl || ''} 
                      onChange={handleInputChange}
                      placeholder="https://example.com/procedures.pdf"
                  />
               </div>
               {profile.rating !== undefined && (
                  <div>
                    <Label>Current Rating</Label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Your rating is {profile.rating.toFixed(1)}. This is calculated from client feedback and cannot be edited.</span>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Services Offered */}
          <Card className="group-disabled:opacity-50">
              <CardHeader><CardTitle className="flex items-center"><ListChecks className="h-5 w-5 mr-2 text-primary"/>Services Offered</CardTitle></CardHeader>
              <CardContent>
                  {(profile.servicesOffered || []).map((service) => (
                      <div key={service.id} className="grid grid-cols-[1fr_auto] gap-2 items-end mb-2">
                          <div className="grid grid-cols-1 md:grid-cols-[4fr_1.5fr_1.2fr_0.8fr_0.7fr] gap-2">
                              <div><Label>Service</Label><Select value={service.name} onValueChange={(v) => handleDynamicListChange('servicesOffered', service.id, 'name', v)}><SelectTrigger className="w-full"><SelectValue placeholder="Select service" /></SelectTrigger><SelectContent>{PREDEFINED_NDT_SERVICES_TABLE.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                              <div><Label>Unit</Label><Select value={service.unit} onValueChange={(v) => handleDynamicListChange('servicesOffered', service.id, 'unit', v)}><SelectTrigger className="w-full"><SelectValue placeholder="Unit" /></SelectTrigger><SelectContent>{SERVICE_UNITS.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select></div>
                              <div><Label>Rate</Label><Input value={service.rate} onChange={(e) => handleDynamicListChange('servicesOffered', service.id, 'rate', e.target.value)} placeholder="Rate" /></div>
                              <div><Label>Currency</Label><Select value={service.currency} onValueChange={(v) => handleDynamicListChange('servicesOffered', service.id, 'currency', v)}><SelectTrigger className="w-full"><SelectValue placeholder="Currency" /></SelectTrigger><SelectContent>{CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                              <div><Label>Tax %</Label><Input value={service.tax || ''} onChange={(e) => handleDynamicListChange('servicesOffered', service.id, 'tax', e.target.value)} placeholder="Tax" className="w-full" /></div>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeDynamicListItem('servicesOffered', service.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                      </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => {
                    console.log('Adding service item...');
                    addDynamicListItem('servicesOffered');
                  }}>
                    <PlusCircle className="mr-2 h-4 w-4"/>Add Service
                  </Button>
              </CardContent>
          </Card>

          {/* Certifications and Qualifications */}
          <Card className="group-disabled:opacity-50">
              <CardHeader><CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2 text-primary"/>Certifications & Qualifications</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                  <div>
                      <Label className="font-semibold">Company Certifications</Label>
                      {(profile.certifications || []).map((cert) => (
                           <div key={cert.id} className="grid grid-cols-[1fr_auto] gap-2 items-end mb-2">
                              <div className="grid grid-cols-2 gap-2">
                                  <div><Label>Name</Label><Select value={cert.name} onValueChange={(v) => handleDynamicListChange('certifications', cert.id, 'name', v)}><SelectTrigger/><SelectContent>{COMPANY_CERTIFICATIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                                  <div><Label>Category</Label><Input value={cert.category || ''} onChange={(e) => handleDynamicListChange('certifications', cert.id, 'category', e.target.value)} /></div>
                              </div>
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeDynamicListItem('certifications', cert.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                          </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => {
                        console.log('Adding certification item...');
                        addDynamicListItem('certifications');
                      }}>
                        <PlusCircle className="mr-2 h-4 w-4"/>Add Certification
                      </Button>
                  </div>
                   <div>
                      <Label className="font-semibold">Personnel Qualifications</Label>
                      {(profile.personnelQualifications || []).map((qual) => (
                           <div key={qual.id} className="grid grid-cols-[1fr_auto] gap-2 items-end mb-2">
                              <div className="grid grid-cols-3 gap-2">
                                  <div><Label>Qty</Label><Input type="number" value={qual.quantity} onChange={(e) => handleDynamicListChange('personnelQualifications', qual.id, 'quantity', parseInt(e.target.value))} /></div>
                                  <div><Label>Body</Label><Select value={qual.certificationBody} onValueChange={(v) => handleDynamicListChange('personnelQualifications', qual.id, 'certificationBody', v)}><SelectTrigger/><SelectContent>{QUALIFICATION_BODIES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div>
                                  <div><Label>Level</Label><Select value={qual.level} onValueChange={(v) => handleDynamicListChange('personnelQualifications', qual.id, 'level', v)}><SelectTrigger/><SelectContent>{QUALIFICATION_LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select></div>
                              </div>
                              <Button type="button" variant="ghost" size="icon" onClick={() => removeDynamicListItem('personnelQualifications', qual.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                          </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => {
                        console.log('Adding qualification item...');
                        addDynamicListItem('personnelQualifications');
                      }}>
                        <PlusCircle className="mr-2 h-4 w-4"/>Add Qualification
                      </Button>
                  </div>
              </CardContent>
          </Card>
        </fieldset>

        <CardFooter className="pt-6">
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? <><Activity className="mr-2 h-4 w-4 animate-spin"/>Saving...</> : <><Save className="mr-2 h-4 w-4"/>Save Profile</>}
            </Button>
        </CardFooter>
      </form>
    </div>
  );
}
