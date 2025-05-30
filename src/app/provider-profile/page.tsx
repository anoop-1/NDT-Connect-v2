
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Save, Building, Phone, Mail, Globe, Image as ImageIcon, DollarSign, Award, Users2, ShieldCheck, ShieldAlert, BookOpen, ListChecks, PlusCircle, Trash2, PenTool, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ServiceOffering, PersonnelQualification, CompanyCertification } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


const PREDEFINED_NDT_SERVICES_TABLE = [
  "Radiographic Testing", "Ultrasonic Testing", "Magnetic Particle Testing",
  "Liquid Penetrant Testing", "Visual Testing", "Eddy Current Testing",
  "Magnetic Flux Leakage", "Internal Rotary Inspection System",
  "Surface Eddy Current Testing", "Pulsed Eddy Current Testing",
  "Phased Array Ultrasonic Testing", "Long Range Ultrasonic Testing",
  "Vacuum Box Testing"
];


const SERVICE_UNITS = [
  "per hour", "per day", "per month", "per meter", "per mm of thickness", "per inch of thickness"
];

const COMPANY_CERTIFICATIONS = [
  "ISO 9001", "ISO 14001", "ISO 17020", "ISO 17024", "ISO 17025", "ISO 45001",
  "ABS (American Bureau of Shipping)", "DNV (Det Norske Veritas)", "LR (Lloyd's Register)", "BV (Bureau Veritas)",
  "NKK (Nippon Kaiji Kyokai)", "IRS (Indian Register of Shipping)", "RINA (Registro Italiano Navale)",
  "CCS (China Classification Society)", "KR (Korean Register of Shipping)", "Other"
];

const QUALIFICATION_BODIES = [
  "ASNT (American Society for Nondestructive Testing)", "PCN (Personnel Certification in Non-Destructive Testing)",
  "ISO 9712", "CSWIP (Certification Scheme for Welding Inspection Personnel)",
  "CGSB (Canadian General Standards Board)", "AWS (American Welding Society)", "CWI (Certified Welding Inspector)",
  "ISNT (Indian Society for Non-Destructive Testing)", "AINDT (Australian Institute for NDT)", "BINDT (British Institute of Non-Destructive Testing)", "Other"
];

const QUALIFICATION_LEVELS = ["Level I", "Level II", "Level III", "Technician", "Inspector", "Engineer", "Assistant", "Senior", "Other"];

const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

const defaultServiceOffering = (): ServiceOffering => ({
  id: generateUniqueId(),
  name: PREDEFINED_NDT_SERVICES_TABLE[0],
  rate: '',
  unit: SERVICE_UNITS[0]
});

const defaultPersonnelQualification = (): PersonnelQualification => ({
  id: generateUniqueId(),
  quantity: 1,
  certificationBody: QUALIFICATION_BODIES[0],
  level: QUALIFICATION_LEVELS[0],
  expiryDate: undefined,
});

const defaultCompanyCertification = (): CompanyCertification => ({
  id: generateUniqueId(),
  name: COMPANY_CERTIFICATIONS[0],
  category: "",
  expiryDate: undefined,
});


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
    servicesOffered: [] as ServiceOffering[],
    certifications: [] as CompanyCertification[], 
    personnelQualifications: [] as PersonnelQualification[],
    availableDocuments: [] as string[],
    serviceRadius: "",
    companyLogoUrl: "",
    baseRate: 0, 
    pricingDetails: "", 
    procedureInfoUrl: "", 
    isVerified: false,
  });
  
  const [docsText, setDocsText] = useState("");


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/provider-profile");
    } else if (user && user.role !== 'provider') {
      router.push("/dashboard");
    } else if (user && user.providerProfile) {
      const { providerProfile } = user;
      
      const loadedServices = (Array.isArray(providerProfile.servicesOffered) && providerProfile.servicesOffered.length > 0)
        ? providerProfile.servicesOffered.map(s => ({
            id: (s && typeof s.id === 'string' && s.id.trim() !== "") ? s.id : generateUniqueId(),
            name: (s && s.name) || PREDEFINED_NDT_SERVICES_TABLE[0],
            rate: String((s && s.rate) || ''), 
            unit: (s && s.unit) || SERVICE_UNITS[0],
          }))
        : [defaultServiceOffering()];

      const loadedQualifications = (Array.isArray(providerProfile.personnelQualifications) && providerProfile.personnelQualifications.length > 0)
        ? providerProfile.personnelQualifications.map(q => ({
            id: (q && typeof q.id === 'string' && q.id.trim() !== "") ? q.id : generateUniqueId(),
            quantity: (q && (typeof q.quantity === 'number' || (typeof q.quantity === 'string' && q.quantity.trim() !== ''))) ? q.quantity : 1,
            certificationBody: (q && q.certificationBody) || QUALIFICATION_BODIES[0],
            level: (q && q.level) || QUALIFICATION_LEVELS[0],
            expiryDate: q.expiryDate ? new Date(q.expiryDate) : undefined,
          }))
        : [defaultPersonnelQualification()];

      const loadedCompanyCertifications = (Array.isArray(providerProfile.certifications) && providerProfile.certifications.length > 0 && typeof providerProfile.certifications[0] === 'object')
        ? providerProfile.certifications.map(c => ({
            id: (c && typeof c.id === 'string' && c.id.trim() !== "") ? c.id : generateUniqueId(),
            name: (c && c.name) || COMPANY_CERTIFICATIONS[0],
            category: (c && c.category) || "",
            expiryDate: c.expiryDate ? new Date(c.expiryDate) : undefined,
          }))
        : [defaultCompanyCertification()];

      setProfileData({
        companyName: user.name || "",
        contactEmail: user.email,
        phone: providerProfile.contactNumber || "",
        website: providerProfile.companyLogoUrl ? providerProfile.website || "" : "https://example.com", 
        address: providerProfile.location || "",
        bio: providerProfile.procedureInfoUrl || "Update company bio here.", 
        servicesOffered: loadedServices,
        certifications: loadedCompanyCertifications,
        personnelQualifications: loadedQualifications,
        availableDocuments: providerProfile.availableDocuments || [],
        serviceRadius: providerProfile.serviceRadius || "", 
        companyLogoUrl: providerProfile.companyLogoUrl || "",
        baseRate: providerProfile.baseRate || 0,
        pricingDetails: providerProfile.pricingDetails || "",
        procedureInfoUrl: providerProfile.procedureInfoUrl || "", 
        isVerified: providerProfile.isVerified || false,
      });
      setDocsText((providerProfile.availableDocuments || []).join(", "));
    } else if (user && !user.providerProfile) { 
        setProfileData(prev => ({
            ...prev,
            companyName: user.name || "",
            contactEmail: user.email,
            servicesOffered: [defaultServiceOffering()],
            personnelQualifications: [defaultPersonnelQualification()],
            certifications: [defaultCompanyCertification()],
            availableDocuments: [],
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

  const handleServiceOfferingChange = (id: string, field: keyof ServiceOffering, value: any) => {
    setProfileData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    }));
  };
  
  const handleAddServiceOfferingRow = () => {
    setProfileData(prev => ({
      ...prev,
      servicesOffered: [
        ...prev.servicesOffered,
        defaultServiceOffering()
      ]
    }));
  };

  const handleRemoveServiceOfferingRow = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.length > 1 ? prev.servicesOffered.filter(s => s.id !== id) : prev.servicesOffered
    }));
  };
  
  const handleCompanyCertificationChange = (id: string, field: keyof CompanyCertification, value: any) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const handleAddCompanyCertificationRow = () => {
    setProfileData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        defaultCompanyCertification()
      ]
    }));
  };

  const handleRemoveCompanyCertificationRow = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.length > 1 ? prev.certifications.filter(c => c.id !== id) : prev.certifications
    }));
  };

  const handlePersonnelQualificationChange = (id: string, field: keyof PersonnelQualification, value: any) => {
     setProfileData(prev => ({
      ...prev,
      personnelQualifications: prev.personnelQualifications.map(qual => 
        qual.id === id ? { ...qual, [field]: field === 'quantity' ? (parseInt(value,10) || 0) : value } : qual
      )
    }));
  };

  const handleAddPersonnelQualification = () => {
    setProfileData(prev => ({
      ...prev,
      personnelQualifications: [
        ...prev.personnelQualifications,
        defaultPersonnelQualification()
      ]
    }));
  };

  const handleRemovePersonnelQualification = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      personnelQualifications: prev.personnelQualifications.length > 1 ? prev.personnelQualifications.filter(q => q.id !== id) : prev.personnelQualifications
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedDocs = docsText.split(',').map(s => s.trim()).filter(Boolean);

    const finalServicesOffered = profileData.servicesOffered.map(s => ({
      ...s,
      rate: s.rate 
    }));
    
    const finalPersonnelQualifications = profileData.personnelQualifications.map(q => ({
        ...q,
        quantity: typeof q.quantity === 'string' ? parseInt(q.quantity, 10) || 1 : q.quantity 
    }));


    await new Promise(resolve => setTimeout(resolve, 1500));

    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.companyName, 
        providerProfile: {
          ...(user.providerProfile || {}), 
          location: profileData.address,
          servicesOffered: finalServicesOffered,
          contactNumber: profileData.phone,
          website: profileData.website,
          companyLogoUrl: profileData.companyLogoUrl,
          baseRate: profileData.baseRate,
          pricingDetails: profileData.pricingDetails,
          procedureInfoUrl: profileData.procedureInfoUrl, 
          certifications: profileData.certifications,
          personnelQualifications: finalPersonnelQualifications,
          availableDocuments: updatedDocs,
          isVerified: profileData.isVerified, 
          serviceRadius: profileData.serviceRadius,
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
            <CardDescription>Define each NDT service you provide along with its rate and unit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(profileData.servicesOffered || []).map((service) => (
              <Card key={service.id} className="p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <div className="md:col-span-2">
                    <Label htmlFor={`service-name-${service.id}`}>Service Name</Label>
                    <Select
                      value={service.name}
                      onValueChange={(value) => handleServiceOfferingChange(service.id, 'name', value)}
                    >
                      <SelectTrigger id={`service-name-${service.id}`}>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {PREDEFINED_NDT_SERVICES_TABLE.map(ndtService => (
                          <SelectItem key={ndtService} value={ndtService}>{ndtService}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`service-rate-${service.id}`}>Rate</Label>
                    <Input
                      id={`service-rate-${service.id}`}
                      type="text" 
                      placeholder="e.g., 100 or 50.50"
                      value={service.rate}
                      onChange={(e) => handleServiceOfferingChange(service.id, 'rate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`service-unit-${service.id}`}>Unit</Label>
                      <Select
                        value={service.unit}
                        onValueChange={(value) => handleServiceOfferingChange(service.id, 'unit', value)}
                      >
                        <SelectTrigger id={`service-unit-${service.id}`}>
                          <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_UNITS.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                        </SelectContent>
                      </Select>
                  </div>
                </div>
                {(profileData.servicesOffered || []).length > 1 && (
                  <div className="mt-2 text-right">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveServiceOfferingRow(service.id)} 
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove Service
                    </Button>
                  </div>
                )}
              </Card>
            ))}
            <Button type="button" onClick={handleAddServiceOfferingRow} variant="outline" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2"/> Add Service Offering
            </Button>
          </CardContent>
        </Card>


        {/* Company Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2 text-primary"/>Company Certifications & Accreditations</CardTitle>
            <CardDescription>List your company and classification society certifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Certification Name</TableHead>
                  <TableHead className="w-[30%]">Category/Details</TableHead>
                  <TableHead className="w-[20%]">Expiry Date</TableHead>
                  <TableHead className="text-right w-[10%]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(profileData.certifications || []).map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell>
                      <Select
                        value={cert.name}
                        onValueChange={(value) => handleCompanyCertificationChange(cert.id, 'name', value)}
                      >
                        <SelectTrigger><SelectValue placeholder="Select Certification" /></SelectTrigger>
                        <SelectContent>
                          {COMPANY_CERTIFICATIONS.map(cName => <SelectItem key={cName} value={cName}>{cName}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="e.g., Standard No., Scope"
                        value={cert.category || ""}
                        onChange={(e) => handleCompanyCertificationChange(cert.id, 'category', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !cert.expiryDate && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {cert.expiryDate ? format(cert.expiryDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={cert.expiryDate}
                            onSelect={(date) => handleCompanyCertificationChange(cert.id, 'expiryDate', date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="text-right">
                      {(profileData.certifications || []).length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveCompanyCertificationRow(cert.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button type="button" variant="outline" onClick={handleAddCompanyCertificationRow} className="w-full">
              <PlusCircle className="h-4 w-4 mr-2"/> Add Certification
            </Button>
          </CardContent>
        </Card>
        
        {/* Personnel Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Users2 className="h-5 w-5 mr-2 text-primary"/>Personnel Qualifications</CardTitle>
            <CardDescription>List the qualifications of your technical personnel. Add one row per qualification type.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Quantity</TableHead>
                  <TableHead>Certification Body</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right w-[50px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(profileData.personnelQualifications || []).map((qual) => (
                  <TableRow key={qual.id}>
                    <TableCell>
                      <Input
                        type="number"
                        value={qual.quantity}
                        onChange={(e) => handlePersonnelQualificationChange(qual.id, 'quantity', e.target.value)}
                        min="1"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={qual.certificationBody}
                        onValueChange={(value) => handlePersonnelQualificationChange(qual.id, 'certificationBody', value)}
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
                        onValueChange={(value) => handlePersonnelQualificationChange(qual.id, 'level', value)}
                      >
                        <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
                        <SelectContent>
                          {QUALIFICATION_LEVELS.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                     <TableCell>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn("w-full justify-start text-left font-normal", !qual.expiryDate && "text-muted-foreground")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {qual.expiryDate ? format(qual.expiryDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={qual.expiryDate}
                                onSelect={(date) => handlePersonnelQualificationChange(qual.id, 'expiryDate', date)}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                    <TableCell className="text-right">
                      {(profileData.personnelQualifications || []).length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemovePersonnelQualification(qual.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button type="button" variant="outline" onClick={handleAddPersonnelQualification} className="w-full">
              <PlusCircle className="h-4 w-4 mr-2"/> Add Personnel Qualification
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
                    <Label htmlFor="procedureInfoUrl">Link to General Procedures</Label>
                    <Input id="procedureInfoUrl" name="procedureInfoUrl" type="url" value={profileData.procedureInfoUrl} onChange={handleInputChange} placeholder="https://example.com/your-procedures.pdf" />
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
