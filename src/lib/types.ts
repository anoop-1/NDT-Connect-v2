
export type ClientProfileData = {
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
};

export type ServiceOffering = {
  id: string;
  name: string;
  rate: string;
  unit: string;
  isCustom?: boolean;
};

export type PersonnelQualification = {
  id: string;
  quantity: number | string;
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
  procedureInfoUrl?: string;
  companyLogoUrl?: string;
  dataAiHint?: string;
  certifications?: CompanyCertification[];
  personnelQualifications?: PersonnelQualification[];
  isVerified?: boolean;
  availableDocuments?: string[];
  serviceRadius?: string;
  baseRate?: number;
  description?: string;
  specialization?: string;
  rating?: number;
};

export type User = {
  id: string; // This should be the Firebase Auth UID in a real app
  email: string;
  role: 'client' | 'provider' | 'admin';
  name?: string;
  isDemo?: boolean;
  isActive?: boolean;
  createdAt?: any; // To hold Firestore serverTimestamp
  updatedAt?: any; // To hold Firestore serverTimestamp
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
  description?: string;
  imageUrl?: string;
  dataAiHint?: string;
  baseRate?: number;
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
  rating: number;
  description:string;
};

export type ServiceRequest = {
  id: string; // Firestore document ID
  clientId: string;
  clientName?: string; // Denormalized for display
  clientEmail?: string; // Denormalized for display
  providerId?: string;
  providerName?: string;
  serviceType: string;
  location: string;
  description: string;
  requestedDate: any; // Can be string (from mock) or Firestore Timestamp
  estimatedCost?: number;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt?: any; // Firestore serverTimestamp
  updatedAt?: any; // Firestore serverTimestamp
  fileAttachmentUrl?: string; // URL to file in Firebase Storage
};

export type ChatMessage = {
  id: string;
  senderId: string; // User ID or "system" or "provider-simulated"
  text: string;
  timestamp: string; // ISO string
};

export type Discrepancy = {
  clientRequirement: string;
  providerClause: string;
  suggestedRevision: string;
};

export type CompareDocumentsOutput = {
  isCompliant: boolean;
  summary: string;
  discrepancies: Discrepancy[];
};

export type CompareDocumentsInput = {
    clientRequirementDataUri: string;
    providerProcedureDataUri: string;
};
