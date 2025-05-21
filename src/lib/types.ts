
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
  name: string; // This would be ProviderProfileData.companyName or User.name if individual
  location: string; // This would be from ProviderProfileData.location
  services: string[]; // This would be from ProviderProfileData.servicesOffered
  specialization: string; // This might be derived or a separate field
  rating: number;
  contactInfo: string; // This would be ProviderProfileData.contactNumber
  description?: string; // Could be part of profile or dynamically generated
  imageUrl?: string;
  dataAiHint?: string;
  // New fields from user request, though these are more for the provider's own details,
  // not typically public search criteria unless they choose to list them.
  // pricePerService?: string; // Simplified to pricingDetails in ProviderProfileData
  // procedure?: string; // Simplified to procedureInfo in ProviderProfileData
  // acceptanceCriteria?: string; // Simplified to acceptanceCriteriaInfo in ProviderProfileData
};

// Input for the AI recommendation flow for clients
export type OptimizeServiceProviderRecommendationsInput = {
  location: string;
  serviceType: string;
  specialization: string;
  standard?: string; // New field
  assetToBeInspected?: string; // New field
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
  serviceType: string;
  location: string;
  description: string;
  requestedDate: string; 
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
};
