

export type ClientProfileData = {
  companyName: string;
  industry: string;
  primaryLocation: string;
  contactNumber: string;
};

export type ServiceOffering = {
  id: string;
  name: string;
  rate: number;
  unit: string;
  currency: string;
  tax?: number;
  isCustom?: boolean;
};

export type PersonnelQualification = {
  id: string;
  quantity: number;
  certificationBody: string;
  level: string;
};

export type CompanyCertification = {
  id:string;
  name: string;
  category?: string;
};

export type InspectorProfileData = {
  association: 'freelancer' | 'company';
  contactNumber: string;
  companyName: string | null;
  location: string | null; // City, State
  designation: string | null;
  personnelQualifications: PersonnelQualification[];
};

export type ProviderProfileData = {
  companyName: string;
  location: string;
  lat?: number;
  lng?: number;
  servicesOffered: ServiceOffering[];
  contactNumber: string;
  procedureInfoUrl: string | null;
  companyLogoUrl: string | null;
  dataAiHint?: string;
  certifications: CompanyCertification[];
  personnelQualifications: PersonnelQualification[];
  isVerified: boolean;
  availableDocuments: string[];
  serviceRadius: string;
  baseRate: number;
  description?: string;
  specialization?: string;
  rating?: number;
};

export type User = {
  id: string;
  email: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  profileImageUrl: string | null;
  emailVerified?: boolean;
  isDemo?: boolean;
  isActive?: boolean;
  createdAt?: any; 
  updatedAt?: any; 
  clientProfile: ClientProfileData | null;
  providerProfile: ProviderProfileData | null;
  inspectorProfile: InspectorProfileData | null;
};

export type ServiceProvider = {
  id: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
  services: ServiceOffering[];
  specialization: string;
  rating: number;
  description?: string;
  imageUrl?: string;
  dataAiHint?: string;
  baseRate?: number;
  certifications?: CompanyCertification[];
  personnelQualifications?: PersonnelQualification[];
  isVerified?: boolean;
  availableDocuments?: string[];
  isCompany: boolean;
};

export type ServiceRequest = {
  id: string; 
  clientId: string;
  clientName?: string;
  clientEmail?: string;
  providerId: string | null;
  providerName: string | null;
  serviceType: string;
  location: string;
  description: string;
  requestedDate: any;
  estimatedCost: number | null;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt?: any;
  updatedAt?: any;
  fileAttachmentUrl?: string | null;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string; // ISO string
};
