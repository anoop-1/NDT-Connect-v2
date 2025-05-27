
export type ClientProfileData = {
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
};

export type ServiceOffering = {
  id: string; // For unique key in UI lists
  name: string;
  rate?: number | string; // Allow string for flexible input, parse to number on save
  unit?: string;
  isCustom?: boolean;
};

export type PersonnelQualification = {
  id: string; // For unique key
  quantity: number | string; // Allow string for flexible input
  certificationBody: string;
  level: string;
};

export type ProviderProfileData = {
  location?: string;
  lat?: number;
  lng?: number;
  servicesOffered?: ServiceOffering[]; // Updated
  contactNumber?: string;
  pricingDetails?: string; // General pricing text
  procedureInfo?: string;
  acceptanceCriteriaInfo?: string;
  companyLogoUrl?: string;
  baseRate?: number; // Could be a general base rate, servicesOffered will have specific rates
  certifications?: string[]; // For company/classification society certs (checklist)
  personnelQualifications?: PersonnelQualification[]; // Updated
  isVerified?: boolean;
  availableDocuments?: string[];
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
  services: ServiceOffering[]; // Updated from string[]
  specialization: string;
  rating: number;
  contactInfo: string;
  description?: string;
  imageUrl?: string;
  dataAiHint?: string;
  baseRate?: number; // General base rate, specific rates in services
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
