
export type ClientProfileData = {
  companyName: string;
  industry: string;
  primaryLocation: string;
  contactNumber: string;
};

export type ServiceOffering = {
  id: string;
  name: string;
  rate: string;
  unit: string;
  currency: string;
  tax?: string;
  isCustom?: boolean;
};

export type PersonnelQualification = {
  id: string;
  quantity: number | string;
  certificationBody: string;
  level: string;
  expiryDate?: Date | null;
};

export type CompanyCertification = {
  id: string;
  name: string;
  category?: string;
  expiryDate?: Date | null;
};

export type InspectorProfileData = {
  association: 'freelancer' | 'company';
  contactNumber: string;
  // Company-specific fields
  companyName: string | null;
  location: string | null; // City, State
  designation: string | null;
  // Common fields
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
  id: string; // This should be the Firebase Auth UID in a real app
  email: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  profileImageUrl: string | null;
  isDemo?: boolean;
  isActive?: boolean;
  createdAt?: any; // To hold Firestore serverTimestamp
  updatedAt?: any; // To hold Firestore serverTimestamp
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
  isCompany: boolean; // Flag to distinguish between company and inspector
};

export type ServiceRequest = {
  id: string; // Firestore document ID
  clientId: string;
  clientName?: string; // Denormalized for display
  clientEmail?: string; // Denormalized for display
  providerId: string | null;
  providerName: string | null;
  serviceType: string;
  location: string;
  description: string;
  requestedDate: any; // Can be string (from mock) or Firestore Timestamp
  estimatedCost: number | null;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt?: any; // Firestore serverTimestamp
  updatedAt?: any; // Firestore serverTimestamp
  fileAttachmentUrl?: string | null; // URL to file in Firebase Storage
};

export type ChatMessage = {
  id: string;
  senderId: string; // User ID or "system" or "provider-simulated"
  text: string;
  timestamp: string; // ISO string
};
