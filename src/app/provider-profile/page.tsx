
// src/app/provider-profile/page.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Save, Building, Phone, Mail, Globe, Image as ImageIcon, DollarSign, Award, Users2, ShieldCheck, ShieldAlert, BookOpen, ListChecks, PlusCircle, Trash2, PenTool } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ServiceOffering, PersonnelQualification } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const PREDEFINED_NDT_SERVICES = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)", "Time-of-Flight Diffraction (TOFD)"
];

const SERVICE_UNITS = [
  "per hour", "per day", "per month", "per meter", "per mm of thickness", "per inch of thickness", "per item", "per weld", "per project", "Lump Sum"
];

const COMPANY_CERTIFICATIONS = [
  "ISO 9001", "ISO 14001", "ISO 17020", "ISO 17024", "ISO 17025", "ISO 45001",
  "ABS (American Bureau of Shipping)", "DNV (Det Norske Veritas)", "LR (Lloyd's Register)", "BV (Bureau Veritas)",
  "NKK (Nippon Kaiji Kyokai)", "IRS (Indian Register of Shipping)", "RINA (Registro Italiano Navale)",
  "CCS (China Classification Society)", "KR (Korean Register of Shipping)"
];

const QUALIFICATION_BODIES = [
  "ASNT (American Society for Nondestructive Testing)", "PCN (Personnel Certification in Non-Destructive Testing)",
  "ISO 9712", "CSWIP (Certification Scheme for Welding Inspection Personnel)",
  "CGSB (Canadian General Standards Board)", "AWS (American Welding Society)", "CWI (Certified Welding Inspector)",
  "ISNT (Indian Society for Non-Destructive Testing)", "AINDT (Australian Institute for NDT)", "BINDT (British Institute of Non-Destructive Testing)", "Other"
];

const QUALIFICATION_LEVELS = ["Level I", "Level II", "Level III", "Technician", "Inspector", "Engineer", "Assistant", "Senior", "Other"];


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
    bio: "", // General company bio
    servicesOffered: [] as ServiceOffering[],
    certifications: [] as string[], // For company certs
    personnelQualifications: [] as PersonnelQualification[],
    availableDocuments: [] as string[],
    serviceRadius: "",
    companyLogoUrl: "",
    baseRate: 0, // General base rate, maybe not used if all services have specific rates
    pricingDetails: "", // General pricing text
    procedureInfo: "", // General procedure info
    acceptanceCriteriaInfo: "", // General acceptance criteria
    isVerified: false,
  });
  
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [docsText, setDocsText] = useState("");

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
        website: user.providerProfile.companyLogoUrl ? "" : "https://example.com", // This logic for website might need review based on actual data
        address: user.providerProfile.location || "",
        bio: user.providerProfile.procedureInfo || "Update company bio here.", // Temp mapping, might need a dedicated bio field in types
        servicesOffered: user.providerProfile.servicesOffered?.map(s => ({...s, id: s.id || s.name + Date.now()})) || PREDEFINED_NDT_SERVICES.map(s => ({id: s, name: s, rate: '', unit: SERVICE_UNITS[0], isCustom: false })),
        certifications: user.providerProfile.certifications || [],
        personnelQualifications: user.providerProfile.personnelQualifications?.map(q => ({...q, id: q.id || Date.now().toString() + Math.random() })) || [],
        availableDocuments: user.providerProfile.availableDocuments || [],
        serviceRadius: "", // Placeholder, needs a field in types if it's to be saved
        companyLogoUrl: user.providerProfile.companyLogoUrl || "",
        baseRate: user.providerProfile.baseRate || 0,
        pricingDetails: user.providerProfile.pricingDetails || "",
        procedureInfo: user.providerProfile.procedureInfo || "",
        acceptanceCriteriaInfo: user.providerProfile.acceptanceCriteriaInfo || "",
        isVerified: user.providerProfile.isVerified || false,
      });
      setDocsText((user.providerProfile.availableDocuments || []).join(", "));
    } else if (user && !user.providerProfile) { // Initialize for new provider
        setProfileData(prev => ({
            ...prev,
            companyName: user.name || "",
            contactEmail: user.email,
            servicesOffered: PREDEFINED_NDT_SERVICES.map(s => ({id: s, name: s, rate: '', unit: SERVICE_UNITS[0], isCustom: false }))
        }));
    }
  }, [user, loading, router]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: name === "baseRate" ? parseFloat(value) || 0 : value
    }));
  };

  const handleServiceOfferingChange = (index: number, field: keyof ServiceOffering, value: any) => {
    const updatedServices = [...profileData.servicesOffered];
    const serviceToUpdate = { ...updatedServices[index] };
    (serviceToUpdate[field] as any) = value;
    updatedServices[index] = serviceToUpdate;
    setProfileData(prev => ({ ...prev, servicesOffered: updatedServices }));
  };
  
  const handleAddCustomService = () => {
    if (customServiceInput.trim() && !profileData.servicesOffered.find(s => s.name === customServiceInput.trim())) {
      setProfileData(prev => ({
        ...prev,
        servicesOffered: [
          ...prev.servicesOffered,
          { id: customServiceInput.trim() + Date.now(), name: customServiceInput.trim(), rate: '', unit: SERVICE_UNITS[0], isCustom: true }
        ]
      }));
      setCustomServiceInput("");
    } else {
      toast({ title: "Invalid Service", description: "Service name cannot be empty or duplicate.", variant: "destructive" });
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setProfileData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.filter(s => s.id !== serviceId)
    }));
  };

  const handleCertificationChange = (certificationName: string, checked: boolean) => {
    setProfileData(prev => {
      const currentCerts = prev.certifications || [];
      if (checked) {
        return { ...prev, certifications: [...currentCerts, certificationName] };
      } else {
        return { ...prev, certifications: currentCerts.filter(c => c !== certificationName) };
      }
    });
  };
  
  const handlePersonnelQualificationChange = (index: number, field: keyof PersonnelQualification, value: any) => {
    const updatedQuals = [...profileData.personnelQualifications];
    const qualToUpdate = { ...updatedQuals[index] };
    (qualToUpdate[field] as any) = value;
    updatedQuals[index] = qualToUpdate;
    setProfileData(prev => ({ ...prev, personnelQualifications: updatedQuals }));
  };

  const handleAddPersonnelQualification = () => {
    setProfileData(prev => ({
      ...prev,
      personnelQualifications: [
        ...prev.personnelQualifications,
        { id: Date.now().toString() + Math.random().toString(), quantity: 1, certificationBody: QUALIFICATION_BODIES[0], level: QUALIFICATION_LEVELS[0] }
      ]
    }));
  };

  const handleRemovePersonnelQualification = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      personnelQualifications: prev.personnelQualifications.filter(q => q.id !== id)
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedDocs = docsText.split(',').map(s => s.trim()).filter(Boolean);

    // Clean up service offerings: parse rate to number
    const finalServicesOffered = profileData.servicesOffered.map(s => ({
        ...s,
        rate: s.rate === '' ? undefined : (typeof s.rate === 'string' ? parseFloat(s.rate) : s.rate)
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.companyName,
        providerProfile: {
          ...user.providerProfile,
          location: profileData.address,
          servicesOffered: finalServicesOffered,
          contactNumber: profileData.phone,
          companyLogoUrl: profileData.companyLogoUrl,
          baseRate: profileData.baseRate,
          pricingDetails: profileData.pricingDetails,
          procedureInfo: profileData.procedureInfo,
          acceptanceCriteriaInfo: profileData.acceptanceCriteriaInfo,
          certifications: profileData.certifications,
          personnelQualifications: profileData.personnelQualifications.map(q => ({...q, quantity: typeof q.quantity === 'string' ? parseInt(q.quantity) || 0 : q.quantity })),
          availableDocuments: updatedDocs,
          isVerified: profileData.isVerified,
          // serviceRadius is not saved yet, needs to be added to ProviderProfileData type and here if needed
        },
      };
      setUser(updatedUser); // This updates context and triggers localStorage save via AuthContext's useEffect
      localStorage.setItem('ndt-user', JSON.stringify(updatedUser)); // Explicit save to ensure immediate effect
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
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">Manage Your Provider Profile</CardTitle>
                <CardDescription>Keep your information up-to-date to attract clients.</CardDescription>
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
          <CardContent className="space-y-6">
            {/* Basic Info */}
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
            </div>
            <div>
              <Label htmlFor="bio">Company Bio / Overview</Label>
              <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} rows={3} placeholder="Describe your company, expertise, and experience..." />
            </div>
          </CardContent>
        </Card>

        {/* Services Offered */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><ListChecks className="h-5 w-5 mr-2 text-primary"/>Services Offered & Pricing</CardTitle>
            <CardDescription>Specify the NDT services you provide and their unit rates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {profileData.servicesOffered?.map((service, index) => (
                <Card key={service.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-grow">
                      <Label htmlFor={`service-name-${service.id}`}>{service.name} {service.isCustom && "(Custom)"}</Label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                      <Input
                        id={`service-rate-${service.id}`}
                        type="number"
                        placeholder="Rate"
                        value={service.rate ?? ''}
                        onChange={(e) => handleServiceOfferingChange(index, 'rate', e.target.value)}
                        className="w-full sm:w-24"
                        step="0.01"
                      />
                      <Select
                        value={service.unit}
                        onValueChange={(value) => handleServiceOfferingChange(index, 'unit', value)}
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_UNITS.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                     {service.isCustom && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)} className="text-destructive shrink-0">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex gap-2 items-end pt-2">
              <div className="flex-grow">
                <Label htmlFor="customServiceInput">Add Custom Service</Label>
                <Input 
                  id="customServiceInput"
                  placeholder="Enter custom service name" 
                  value={customServiceInput} 
                  onChange={(e) => setCustomServiceInput(e.target.value)}
                />
              </div>
              <Button type="button" onClick={handleAddCustomService} variant="outline">
                <PlusCircle className="h-4 w-4 mr-2"/> Add Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2 text-primary"/>Company Certifications & Accreditations</CardTitle>
            <CardDescription>Select relevant company and classification society certifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 p-4 border rounded-md">
              {COMPANY_CERTIFICATIONS.map(cert => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cert-${cert.replace(/[^a-zA-Z0-9]/g, "")}`}
                    checked={(profileData.certifications || []).includes(cert)}
                    onCheckedChange={(checked) => handleCertificationChange(cert, !!checked)}
                  />
                  <label htmlFor={`cert-${cert.replace(/[^a-zA-Z0-9]/g, "")}`} className="text-sm font-medium leading-none">
                    {cert}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Personnel Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Users2 className="h-5 w-5 mr-2 text-primary"/>Personnel Qualifications</CardTitle>
            <CardDescription>List the qualifications of your technical personnel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Quantity</TableHead>
                  <TableHead>Certification Body</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right w-[50px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profileData.personnelQualifications?.map((qual, index) => (
                  <TableRow key={qual.id}>
                    <TableCell>
                      <Input
                        type="number"
                        value={qual.quantity}
                        onChange={(e) => handlePersonnelQualificationChange(index, 'quantity', e.target.value)}
                        min="1"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={qual.certificationBody}
                        onValueChange={(value) => handlePersonnelQualificationChange(index, 'certificationBody', value)}
                      >
                        <SelectTrigger><SelectValue placeholder="Select Body" /></SelectTrigger>
                        <SelectContent>
                          {QUALIFICATION_BODIES.map(body => <SelectItem key={body} value={body}>{body}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                       <Select
                        value={qual.level}
                        onValueChange={(value) => handlePersonnelQualificationChange(index, 'level', value)}
                      >
                        <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
                        <SelectContent>
                          {QUALIFICATION_LEVELS.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemovePersonnelQualification(qual.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button type="button" variant="outline" onClick={handleAddPersonnelQualification}>
              <PlusCircle className="h-4 w-4 mr-2"/> Add Qualification
            </Button>
          </CardContent>
        </Card>

        {/* Other Details */}
        <Card>
            <CardHeader><CardTitle className="flex items-center"><PenTool className="h-5 w-5 mr-2 text-primary"/>Additional Information</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <div>
                <Label htmlFor="docsText" className="flex items-center"><BookOpen className="h-4 w-4 mr-2 text-muted-foreground"/>Available Technical Documents</Label>
                <Textarea id="docsText" name="docsText" value={docsText} onChange={(e) => setDocsText(e.target.value)} rows={2} placeholder="e.g., General Procedures Manual, ISO 9001 Certificate. Separate with commas." />
                </div>
                <div> 
                    <Label htmlFor="serviceRadius">Service Radius</Label>
                    <Input id="serviceRadius" name="serviceRadius" value={profileData.serviceRadius} onChange={handleInputChange} placeholder="e.g., 50 miles, National" />
                </div>
                <div>
                    <Label htmlFor="baseRate" className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-muted-foreground"/>General Base Rate (Optional)</Label>
                    <Input id="baseRate" name="baseRate" type="number" value={profileData.baseRate} onChange={handleInputChange} placeholder="e.g., 75 (used if specific service rates aren't set)" />
                </div>
                <div>
                    <Label htmlFor="pricingDetails">General Pricing Details</Label>
                    <Textarea id="pricingDetails" name="pricingDetails" value={profileData.pricingDetails} onChange={handleInputChange} rows={2} placeholder="Describe your general pricing structure if not covered by specific service rates." />
                </div>
                <div>
                    <Label htmlFor="procedureInfo">General Procedure Information</Label>
                    <Textarea id="procedureInfo" name="procedureInfo" value={profileData.procedureInfo} onChange={handleInputChange} rows={2} placeholder="Briefly describe your general procedures or mention adherence to specific standards." />
                </div>
                <div>
                    <Label htmlFor="acceptanceCriteriaInfo">General Acceptance Criteria</Label>
                    <Textarea id="acceptanceCriteriaInfo" name="acceptanceCriteriaInfo" value={profileData.acceptanceCriteriaInfo} onChange={handleInputChange} rows={2} placeholder="General acceptance criteria you adhere to (e.g., API 1104, ASME B31.3)." />
                </div>
            </CardContent>
        </Card>

        <CardFooter className="pt-6">
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <> <Activity className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
              ) : (
                <> <Save className="mr-2 h-4 w-4" /> Save Profile </>
              )}
            </Button>
        </CardFooter>
      </form>
    </div>
  );
}
