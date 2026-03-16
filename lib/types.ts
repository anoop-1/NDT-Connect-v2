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

// Nested profile types matching Firestore document structure
export type ClientProfileFields = {
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
};

export type ProviderProfileFields = {
  companyName?: string;
  location?: string;
  contactNumber?: string;
  website?: string;
  companyLogoUrl?: string;
  bio?: string;
  servicesOffered?: ServiceOffering[];
  personnelQualifications?: PersonnelQualification[];
  certifications?: CompanyCertification[];
  availableDocuments?: string[];
  serviceRadius?: string;
  baseRate?: number;
  pricingDetails?: string;
  procedureInfoUrl?: string;
  isVerified?: boolean;
  description?: string;
  specialization?: string;
  rating?: number;
  dataAiHint?: string;
  lat?: number;
  lng?: number;
};

export type InspectorProfileFields = {
  association?: 'freelancer' | 'company';
  companyName?: string;
  location?: string;
  designation?: string;
  contactNumber?: string;
  personnelQualifications?: PersonnelQualification[];
};

export interface ClientUser extends BaseUser {
  role: 'client';
  // Flat fields (from MongoDB registration)
  companyName?: string;
  industry?: string;
  primaryLocation?: string;
  contactNumber?: string;
  // Nested profile (from Firestore)
  clientProfile?: ClientProfileFields;
}

export interface InspectorUser extends BaseUser {
  role: 'inspector';
  association?: 'freelancer' | 'company';
  contactNumber?: string;
  companyName?: string;
  location?: string;
  designation?: string;
  personnelQualifications?: PersonnelQualification[];
  inspectorProfile?: InspectorProfileFields;
}

export interface ProviderUser extends BaseUser {
  role: 'provider';
  companyName?: string;
  location?: string;
  lat?: number;
  lng?: number;
  contactNumber?: string;
  servicesOffered?: ServiceOffering[];
  personnelQualifications?: PersonnelQualification[];
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
  providerProfile?: ProviderProfileFields;
}

export interface AdminUser extends BaseUser {
  role: 'admin';
}

export type User = ClientUser | ProviderUser | InspectorUser | AdminUser;

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
  isCompany: boolean;
};

export type ServiceRequest = {
  id: string;
  clientId: string;
  clientName?: string;
  clientEmail?: string;
  providerId: string | null;
  providerName: string | null;
  serviceType: string;
  location: string;
  description: string;
  requestedDate: any;
  estimatedCost: number | null;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt?: any;
  updatedAt?: any;
  fileAttachmentUrl?: string | null;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type Review = {
  id: string;
  requestId: string;
  reviewerId: string;
  reviewerName: string;
  providerId: string;
  providerName: string;
  rating: number;
  comment: string;
  createdAt: any;
};
