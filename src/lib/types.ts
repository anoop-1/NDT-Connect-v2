
export type ClientProfileData = {
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
};

export type ServiceOffering = {
  id: string;
  name: string;
  rate: string; // Keep as string for input flexibility, parse on submission/use
  unit: string;
  isCustom?: boolean;
};

export type PersonnelQualification = {
  id: string;
  quantity: number | string; // Keep as string for input flexibility
  certificationBody: string;
  level: string;
  expiryDate?: Date;
};

export type CompanyCertification = {
  id: string;
  name: string;
  category?: string;
  expiryDate?: Date;
};

export type ProviderProfileData = {
  location?: string;
  lat?: number;
  lng?: number;
  servicesOffered?: ServiceOffering[];
  contactNumber?: string;
  procedureInfoUrl?: string; // Changed from procedureInfo
  // acceptanceCriteriaInfo?: string; // Removed
  companyLogoUrl?: string;
  dataAiHint?: string;
  certifications?: CompanyCertification[];
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
  baseRate?: number; // This is used by ProviderCard to calculate client price
  certifications?: CompanyCertification[];
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
