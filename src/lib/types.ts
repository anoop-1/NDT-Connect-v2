
export type ClientProfileData = {
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
};

export type ServiceOffering = {
  id: string; // Unique key for UI lists
  name: string; // Selected from a predefined list OR custom text
  rate: string; // Stored as string for input flexibility
  unit: string; // Selected from predefined list OR custom text
  isCustom?: boolean; // Flag to indicate if the service name/unit is custom
};

export type PersonnelQualification = {
  id: string; // For unique key
  quantity: number | string; // Allow string for flexible input
  certificationBody: string;
  level: string;
  expiryDate?: Date; // Added expiryDate field
};

export type ProviderProfileData = {
  location?: string;
  lat?: number;
  lng?: number;
  servicesOffered?: ServiceOffering[];
  contactNumber?: string;
  pricingDetails?: string;
  procedureInfo?: string;
  acceptanceCriteriaInfo?: string;
  companyLogoUrl?: string;
  dataAiHint?: string;
  baseRate?: number;
  certifications?: string[];
  personnelQualifications?: PersonnelQualification[];
  isVerified?: boolean;
  availableDocuments?: string[];
  serviceRadius?: string; 
};

export type User = {
  id: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  name?: string;
  isDemo?: boolean;
  clientProfile?: ClientProfileData;
  providerProfile?: ProviderProfileData;
};

export type ServiceProvider = {
  id:string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
  services: ServiceOffering[]; 
  specialization: string;
  rating: number;
  contactInfo: string;
  description?: string;
  imageUrl?: string;
  dataAiHint?: string;
  baseRate?: number;
  certifications?: string[];
  personnelQualifications?: PersonnelQualification[];
  isVerified?: boolean;
  availableDocuments?: string[];
};

export type OptimizeServiceProviderRecommendationsInput = {
  location: string;
  serviceType: string;
  specialization: string;
  standard?: string;
  assetToBeInspected?: string;
};

export type Recommendation = {
  referenceId: string;
  providerName: string;
  contactInfo: string;
  rating: number;
  description:string;
};

export type ServiceRequest = {
  id: string;
  clientId: string;
  providerId?: string;
  providerName?: string;
  serviceType: string;
  location: string;
  description: string;
  requestedDate: string;
  estimatedCost?: number;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
};

