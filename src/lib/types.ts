
export type ClientProfileData = {
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
};

export type ProviderProfileData = {
  location?: string;
  lat?: number; // Added for latitude
  lng?: number; // Added for longitude
  servicesOffered?: string[];
  contactNumber?: string;
  pricingDetails?: string;
  procedureInfo?: string;
  acceptanceCriteriaInfo?: string;
  companyLogoUrl?: string;
  baseRate?: number;
  certifications?: string[]; 
  personnelQualifications?: string[]; 
  isVerified?: boolean; 
  availableDocuments?: string[];
};

export type User = {
  id: string;
  email: string;
  role: 'client' | 'provider' | 'admin'; // Added 'admin'
  name?: string;
  clientProfile?: ClientProfileData;
  providerProfile?: ProviderProfileData;
};

export type ServiceProvider = {
  id:string;
  name: string;
  location: string;
  lat?: number; // Added for latitude
  lng?: number; // Added for longitude
  services: string[];
  specialization: string;
  rating: number;
  contactInfo: string;
  description?: string;
  imageUrl?: string;
  dataAiHint?: string;
  baseRate?: number;
  certifications?: string[]; 
  personnelQualifications?: string[]; 
  isVerified?: boolean; 
  availableDocuments?: string[];
};

// Input for the AI recommendation flow for clients
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

