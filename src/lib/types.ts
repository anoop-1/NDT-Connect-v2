
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
  pricingDetails?: string; // For textual description
  procedureInfo?: string;
  acceptanceCriteriaInfo?: string;
  companyLogoUrl?: string; // New: For provider's logo
  baseRate?: number; // New: For a base service rate (e.g., hourly)
};

export type User = {
  id: string;
  email: string;
  role: 'client' | 'provider';
  name?: string; // Full name of the person registering
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
  contactInfo: string; // This can be phone or email from profile
  description?: string;
  imageUrl?: string; // Will use this for companyLogoUrl
  dataAiHint?: string;
  baseRate?: number; // New: To pass provider's base rate for display
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
  providerName?: string; // New: To store provider name for the request
  serviceType: string;
  location: string; // Location of service, can be pre-filled from client profile or provider coverage
  description: string;
  requestedDate: string;
  estimatedCost?: number; // New: To store estimated cost
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
};

