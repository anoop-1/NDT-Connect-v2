export type User = {
  id: string;
  email: string;
  role: 'client' | 'provider';
  name?: string;
};

export type ServiceProvider = {
  id: string;
  name: string;
  location: string;
  services: string[];
  specialization: string;
  rating: number;
  contactInfo: string;
  description?: string;
  imageUrl?: string;
};

export type Recommendation = {
  providerName: string;
  contactInfo: string;
  rating: number;
  description: string;
};

export type ServiceRequest = {
  id: string;
  clientId: string;
  providerId?: string;
  serviceType: string;
  location: string;
  description: string;
  requested