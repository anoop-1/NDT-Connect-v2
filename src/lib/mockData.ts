import type { ClientProfileData, ProviderProfileData, InspectorProfileData } from './types';export const MOCK_DEMO_CLIENT: ClientProfileData = {  companyName: "Demo Client Company",  industry: "Oil & Gas",  primaryLocation: "Demo City",  contactNumber: "1234567890",};export const MOCK_DEMO_PROVIDER: ProviderProfileData = {  companyName: "Demo Provider Company",  location: "Demo City",  contactNumber: "0987654321",  servicesOffered: [],
  personnelQualifications: [],
  certifications: [],
  procedureInfoUrl: "",
  companyLogoUrl: "",
};

export const MOCK_DEMO_INSPECTOR: InspectorProfileData = {
  association: "freelancer",
  contactNumber: "1112223333",
  companyName: "",
  location: "",
  designation: "",
};

// Add missing exports for mock arrays used in the app
export const MOCK_PROVIDERS: ProviderProfileData[] = [MOCK_DEMO_PROVIDER];
export const MOCK_CLIENT_REQUESTS: any[] = [];
export const MOCK_PROVIDER_REQUESTS: any[] = [];
