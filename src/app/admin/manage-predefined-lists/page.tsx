
// src/app/admin/manage-predefined-lists/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks, ArrowLeft, AlertTriangle, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM = [
  "Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)",
  "Leak Testing (LT)", "Acoustic Emission Testing (AET)", "Phased Array UT (PAUT)",
  "Time-of-Flight Diffraction (TOFD)", "Other"
];

const DEFAULT_SERVICE_UNITS = [
  "per hour", "per day", "per month", "per meter", "per mm of thickness", "per inch of thickness"
];

const DEFAULT_NDT_SERVICE_TYPES_PROVIDER_PROFILE = [
  "Radiographic Testing", "Ultrasonic Testing", "Magnetic Particle Testing",
  "Liquid Penetrant Testing", "Visual Testing", "Eddy Current Testing",
  "Magnetic Flux Leakage", "Internal Rotary Inspection System",
  "Surface Eddy Current Testing", "Pulsed Eddy Current Testing",
  "Phased Array Ultrasonic Testing", "Long Range Ultrasonic Testing",
  "Vacuum Box Testing"
];

const DEFAULT_COMPANY_CERTIFICATIONS = [
  "ISO 9001", "ISO 14001", "ISO 17020", "ISO 17024", "ISO 17025", "ISO 45001",
  "ABS", "DNV", "LR", "BV", "NKK", "IRS", "RINA", "CCS", "KR", "Other"
];

const DEFAULT_PERSONNEL_QUALIFICATION_BODIES = [
  "ASNT", "PCN", "ISO 9712", "CSWIP", "CGSB", "AWS", "CWI", "ISNT", "AINDT", "BINDT", "Other"
];

const DEFAULT_PERSONNEL_QUALIFICATION_LEVELS = [
  "Level I", "Level II", "Level III", "Technician", "Inspector", "Engineer", "Assistant", "Senior", "Other"
];

const OTHER_PREDEFINED_LISTS_INFO: { name: string; details: string }[] = [
  // Items moved to editable sections
];

const LOCALSTORAGE_KEY_CLIENT_NDT_SERVICES = "adminManaged_clientNdtServices";
const LOCALSTORAGE_KEY_ADMIN_SERVICE_UNITS = "adminManaged_serviceUnits";
const LOCALSTORAGE_KEY_PROVIDER_PROFILE_NDT_SERVICES = "adminManaged_providerProfileNdtServices";
const LOCALSTORAGE_KEY_COMPANY_CERTIFICATIONS = "adminManaged_companyCertifications";
const LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_BODIES = "adminManaged_personnelQualificationBodies";
const LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_LEVELS = "adminManaged_personnelQualificationLevels";


export default function ManagePredefinedListsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [clientNdtServices, setClientNdtServices] = useState<string[]>(DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM);
  const [newClientNdtServiceText, setNewClientNdtServiceText] = useState("");

  const [serviceUnits, setServiceUnits] = useState<string[]>(DEFAULT_SERVICE_UNITS);
  const [newServiceUnitText, setNewServiceUnitText] = useState("");

  const [providerProfileNdtServices, setProviderProfileNdtServices] = useState<string[]>(DEFAULT_NDT_SERVICE_TYPES_PROVIDER_PROFILE);
  const [newProviderProfileNdtServiceText, setNewProviderProfileNdtServiceText] = useState("");

  const [companyCertifications, setCompanyCertifications] = useState<string[]>(DEFAULT_COMPANY_CERTIFICATIONS);
  const [newCompanyCertificationText, setNewCompanyCertificationText] = useState("");

  const [personnelQualificationBodies, setPersonnelQualificationBodies] = useState<string[]>(DEFAULT_PERSONNEL_QUALIFICATION_BODIES);
  const [newPersonnelQualificationBodyText, setNewPersonnelQualificationBodyText] = useState("");

  const [personnelQualificationLevels, setPersonnelQualificationLevels] = useState<string[]>(DEFAULT_PERSONNEL_QUALIFICATION_LEVELS);
  const [newPersonnelQualificationLevelText, setNewPersonnelQualificationLevelText] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin/manage-predefined-lists");
    } else if (!loading && user && user.role !== 'admin') {
      router.push("/dashboard");
    } else {
      // Load Client NDT Services
      loadListFromLocalStorage(LOCALSTORAGE_KEY_CLIENT_NDT_SERVICES, DEFAULT_NDT_SERVICE_TYPES_CLIENT_FORM, setClientNdtServices, "client NDT services");
      // Load Service Units
      loadListFromLocalStorage(LOCALSTORAGE_KEY_ADMIN_SERVICE_UNITS, DEFAULT_SERVICE_UNITS, setServiceUnits, "service units");
      // Load Provider Profile NDT Services
      loadListFromLocalStorage(LOCALSTORAGE_KEY_PROVIDER_PROFILE_NDT_SERVICES, DEFAULT_NDT_SERVICE_TYPES_PROVIDER_PROFILE, setProviderProfileNdtServices, "provider profile NDT services");
      // Load Company Certifications
      loadListFromLocalStorage(LOCALSTORAGE_KEY_COMPANY_CERTIFICATIONS, DEFAULT_COMPANY_CERTIFICATIONS, setCompanyCertifications, "company certifications");
      // Load Personnel Qualification Bodies
      loadListFromLocalStorage(LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_BODIES, DEFAULT_PERSONNEL_QUALIFICATION_BODIES, setPersonnelQualificationBodies, "personnel qualification bodies");
      // Load Personnel Qualification Levels
      loadListFromLocalStorage(LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_LEVELS, DEFAULT_PERSONNEL_QUALIFICATION_LEVELS, setPersonnelQualificationLevels, "personnel qualification levels");
    }
  }, [user, loading, router]);
  
  const loadListFromLocalStorage = (key: string, defaultList: string[], setter: (list: string[]) => void, listName: string) => {
    const storedList = localStorage.getItem(key);
    if (storedList) {
      try {
        const parsedList = JSON.parse(storedList);
        if (Array.isArray(parsedList) && parsedList.every(item => typeof item === 'string')) {
          setter(parsedList);
        } else {
          setter(defaultList);
        }
      } catch (e) {
        console.error(`Error parsing stored ${listName}:`, e);
        setter(defaultList);
      }
    } else {
      setter(defaultList);
    }
  };

  const saveListToLocalStorage = (key: string, list: string[], setter: (list: string[]) => void, toastMessage: string) => {
    localStorage.setItem(key, JSON.stringify(list));
    setter(list);
    toast({ title: "List Updated", description: `${toastMessage} list saved locally.` });
  };

  const handleAddItem = (newItemText: string, currentList: string[], setter: (list: string[]) => void, setNewItemText: (text: string) => void, listKey: string, toastMessage: string, itemTypeName: string) => {
    if (newItemText.trim() === "") {
      toast({ title: `Cannot Add Empty ${itemTypeName}`, variant: "destructive" });
      return;
    }
    if (currentList.includes(newItemText.trim())) {
      toast({ title: `${itemTypeName} Already Exists`, description: `${newItemText.trim()} is already in the list.`, variant: "destructive" });
      return;
    }
    const updatedList = [...currentList, newItemText.trim()];
    saveListToLocalStorage(listKey, updatedList, setter, toastMessage);
    setNewItemText("");
  };

  const handleRemoveItem = (itemToRemove: string, currentList: string[], setter: (list: string[]) => void, listKey: string, toastMessage: string) => {
    const updatedList = currentList.filter(item => item !== itemToRemove);
    saveListToLocalStorage(listKey, updatedList, setter, toastMessage);
  };

  // Client NDT Services handlers
  const handleAddClientNdtServiceItem = () => handleAddItem(newClientNdtServiceText, clientNdtServices, setClientNdtServices, setNewClientNdtServiceText, LOCALSTORAGE_KEY_CLIENT_NDT_SERVICES, "Client NDT Service Types", "Service Type");
  const handleRemoveClientNdtServiceItem = (item: string) => handleRemoveItem(item, clientNdtServices, setClientNdtServices, LOCALSTORAGE_KEY_CLIENT_NDT_SERVICES, "Client NDT Service Types");

  // Service Units handlers
  const handleAddServiceUnitItem = () => handleAddItem(newServiceUnitText, serviceUnits, setServiceUnits, setNewServiceUnitText, LOCALSTORAGE_KEY_ADMIN_SERVICE_UNITS, "Service Units", "Service Unit");
  const handleRemoveServiceUnitItem = (item: string) => handleRemoveItem(item, serviceUnits, setServiceUnits, LOCALSTORAGE_KEY_ADMIN_SERVICE_UNITS, "Service Units");

  // Provider Profile NDT Services handlers
  const handleAddProviderProfileNdtServiceItem = () => handleAddItem(newProviderProfileNdtServiceText, providerProfileNdtServices, setProviderProfileNdtServices, setNewProviderProfileNdtServiceText, LOCALSTORAGE_KEY_PROVIDER_PROFILE_NDT_SERVICES, "Provider Profile NDT Service Types", "Service Type");
  const handleRemoveProviderProfileNdtServiceItem = (item: string) => handleRemoveItem(item, providerProfileNdtServices, setProviderProfileNdtServices, LOCALSTORAGE_KEY_PROVIDER_PROFILE_NDT_SERVICES, "Provider Profile NDT Service Types");

  // Company Certifications handlers
  const handleAddCompanyCertificationItem = () => handleAddItem(newCompanyCertificationText, companyCertifications, setCompanyCertifications, setNewCompanyCertificationText, LOCALSTORAGE_KEY_COMPANY_CERTIFICATIONS, "Company Certifications", "Certification");
  const handleRemoveCompanyCertificationItem = (item: string) => handleRemoveItem(item, companyCertifications, setCompanyCertifications, LOCALSTORAGE_KEY_COMPANY_CERTIFICATIONS, "Company Certifications");

  // Personnel Qualification Bodies handlers
  const handleAddPersonnelQualificationBodyItem = () => handleAddItem(newPersonnelQualificationBodyText, personnelQualificationBodies, setPersonnelQualificationBodies, setNewPersonnelQualificationBodyText, LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_BODIES, "Personnel Qualification Bodies", "Body");
  const handleRemovePersonnelQualificationBodyItem = (item: string) => handleRemoveItem(item, personnelQualificationBodies, setPersonnelQualificationBodies, LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_BODIES, "Personnel Qualification Bodies");

  // Personnel Qualification Levels handlers
  const handleAddPersonnelQualificationLevelItem = () => handleAddItem(newPersonnelQualificationLevelText, personnelQualificationLevels, setPersonnelQualificationLevels, setNewPersonnelQualificationLevelText, LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_LEVELS, "Personnel Qualification Levels", "Level");
  const handleRemovePersonnelQualificationLevelItem = (item: string) => handleRemoveItem(item, personnelQualificationLevels, setPersonnelQualificationLevels, LOCALSTORAGE_KEY_PERSONNEL_QUALIFICATION_LEVELS, "Personnel Qualification Levels");

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <div className="text-center py-10">Access Denied. Redirecting...</div>;
  }

  const renderEditableList = (
    title: string,
    description: string,
    list: string[],
    newItemText: string,
    setNewItemText: (text: string) => void,
    addItemHandler: () => void,
    removeItemHandler: (item: string) => void,
    itemTypeName: string,
    newItemPlaceholder: string
  ) => (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="font-semibold">Current Items:</Label>
          {list.length > 0 ? (
            <ul className="list-disc list-inside pl-4 space-y-1 text-sm">
              {list.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{item}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeItemHandler(item)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No items in the list.</p>
          )}
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-grow">
            <Label htmlFor={`new-${itemTypeName.toLowerCase().replace(/\s/g, '-')}`}>{`Add New ${itemTypeName}`}</Label>
            <Input
              id={`new-${itemTypeName.toLowerCase().replace(/\s/g, '-')}`}
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder={newItemPlaceholder}
            />
          </div>
          <Button onClick={addItemHandler} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );


  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ListChecks className="mr-2 h-6 w-6 text-primary" />
            Manage Predefined Lists
          </CardTitle>
          <CardDescription>
            This section allows management of predefined lists used across NDT Connect.
            Edits are stored in your browser and do not affect other users or forms directly without code changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="p-4 border border-amber-500 bg-amber-50 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-3 text-amber-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-700">Important Note on Editing</h4>
                <p className="text-sm text-amber-600">
                  Changes made to the lists below are saved only in **your current browser's local storage**.
                  They demonstrate how an admin might manage these lists. However, these local changes **do not automatically update the dropdowns or selections used in actual forms or AI recommendations across the application for all users.**
                  Modifying the globally used lists still requires code changes.
                </p>
              </div>
            </div>
          </div>

          {renderEditableList(
            "NDT Service Types (for Client Request Forms & AI Recommendations)",
            "Admin can add or remove items from this list (changes stored locally).",
            clientNdtServices,
            newClientNdtServiceText,
            setNewClientNdtServiceText,
            handleAddClientNdtServiceItem,
            handleRemoveClientNdtServiceItem,
            "Service Type",
            "e.g., Neutron Radiography"
          )}

          {renderEditableList(
            "NDT Service Types (for Provider Profile & Registration)",
            "Admin can add or remove items from this list (changes stored locally).",
            providerProfileNdtServices,
            newProviderProfileNdtServiceText,
            setNewProviderProfileNdtServiceText,
            handleAddProviderProfileNdtServiceItem,
            handleRemoveProviderProfileNdtServiceItem,
            "Service Type",
            "e.g., Guided Wave Testing"
          )}
          
          {renderEditableList(
            "Service Units",
            "Admin can add or remove items from this list (changes stored locally). Used in Provider Profile & Registration.",
            serviceUnits,
            newServiceUnitText,
            setNewServiceUnitText,
            handleAddServiceUnitItem,
            handleRemoveServiceUnitItem,
            "Service Unit",
            "e.g., per item"
          )}

          {renderEditableList(
            "Company Certifications",
            "Admin can add or remove items from this list (changes stored locally). Used in Provider Profile & Registration dropdowns.",
            companyCertifications,
            newCompanyCertificationText,
            setNewCompanyCertificationText,
            handleAddCompanyCertificationItem,
            handleRemoveCompanyCertificationItem,
            "Company Certification",
            "e.g., API Monogram"
          )}

          {renderEditableList(
            "Personnel Qualification Bodies",
            "Admin can add or remove items from this list (changes stored locally). Used in Provider Profile & Registration dropdowns.",
            personnelQualificationBodies,
            newPersonnelQualificationBodyText,
            setNewPersonnelQualificationBodyText,
            handleAddPersonnelQualificationBodyItem,
            handleRemovePersonnelQualificationBodyItem,
            "Qualification Body",
            "e.g., ACCP"
          )}

          {renderEditableList(
            "Personnel Qualification Levels",
            "Admin can add or remove items from this list (changes stored locally). Used in Provider Profile & Registration dropdowns.",
            personnelQualificationLevels,
            newPersonnelQualificationLevelText,
            setNewPersonnelQualificationLevelText,
            handleAddPersonnelQualificationLevelItem,
            handleRemovePersonnelQualificationLevelItem,
            "Qualification Level",
            "e.g., Trainee"
          )}
          
          <hr/>
          <h3 className="text-xl font-semibold pt-4">Other Predefined Lists (Currently Display-Only):</h3>
          {OTHER_PREDEFINED_LISTS_INFO.length > 0 ? (
            <div className="space-y-4">
              {OTHER_PREDEFINED_LISTS_INFO.map((list) => (
                <Card key={list.name} className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">{list.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{list.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <p className="text-sm text-muted-foreground">All lists are now manageable above.</p>
          )}
          
          <div className="mt-6 p-6 border border-dashed rounded-lg text-center">
            [Full UI for managing all lists (add/edit/remove) is a future enhancement that would typically require backend integration for global application updates.]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
    
    
    

    

    

    