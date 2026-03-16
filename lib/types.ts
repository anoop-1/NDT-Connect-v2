export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'provider' | 'inspector' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  isDemo?: boolean;
  isActive?: boolean;
  profileImageUrl?: string;
}

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
  expiryDate?: Date | null;
};

export type CompanyCertification = {
  id: string;
  name: string;
  category?: string;
  expiryDate?: Date | null;
};

export interface ClientUser extends BaseUser {
  role: 'client';
  companyName: string;
  industry: string;
  primaryLocation: string;
  contactNumber: string;
}

export interface InspectorUser extends BaseUser {
  role: 'inspector';
  association: 'freelancer' | 'company';
  contactNumber: string;
  companyName?: string;
  location?: string;
  designation?: string;
  personnelQualifications: PersonnelQualification[];
}

export interface ProviderUser extends BaseUser {
  role: 'provider';
  companyName: string;
  location: string;
  lat?: number;
  lng?: number;
  contactNumber: string;
  servicesOffered: ServiceOffering[];
  personnelQualifications: PersonnelQualification[];
  certifications?: CompanyCertification[];
  procedureInfoUrl?: string;
  companyLogoUrl?: string;
  dataAiHint?: string;
  isVerified?: boolean;
  availableDocuments?: string[];
  serviceRadius?: string;
  baseRate?: number;
  description?: string;
  specialization?: string;
  rating?: number;
}

export type User = ClientUser | ProviderUser | InspectorUser;

export type ClientProfileData = Omit<ClientUser, keyof BaseUser>;
export type InspectorProfileData = Omit<InspectorUser, keyof BaseUser>;
export type ProviderProfileData = Omit<ProviderUser, keyof BaseUser>;

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

// Remove redundant export block at the end of the file
