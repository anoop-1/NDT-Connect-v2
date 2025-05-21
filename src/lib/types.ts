
export type ClientProfileData = {
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
};

export type ProviderProfileData = {
  location?: string;
  servicesOffered?: string[];
  contactNumber?: string;
  pricingDetails?: string;
  procedureInfo?: string;
  acceptanceCriteriaInfo?: string;
  companyLogoUrl?: string;
  baseRate?: number;
  certifications?: string[]; // New: List of certifications (e.g., "ISO 9001", "DNV Certified")
  personnelQualifications?: string[]; // New: List of personnel qualifications (e.g., "SNT-TC-1A Level II", "NAS 410")
  isVerified?: boolean; // New: Admin-controlled verification status
};

export type User = {
  id: string;
  email: string;
  role: 'client' | 'provider';
  name?: string;
  clientProfile?: ClientProfileData;
  providerProfile?: ProviderProfileData;
};

export type ServiceProvider = {
  id:string;
  name: string;
  location: string;
  services: string[];
  specialization: string;
  rating: number;
  contactInfo: string;
  description?: string;
  imageUrl?: string;
  dataAiHint?: string;
  baseRate?: number;
  certifications?: string[]; // New
  personnelQualifications?: string[]; // New
  isVerified?: boolean; // New
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
