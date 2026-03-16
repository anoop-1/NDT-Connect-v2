// src/lib/mockData.ts
import type { User, ServiceProvider, ServiceRequest, ClientProfileData, ProviderProfileData, ServiceOffering, PersonnelQualification, CompanyCertification } from './types';

// Centralized Mock Data for Demo Mode

// ==================================
// MOCK USERS (for demo sessions)
// ==================================
const DEMO_CLIENT_PROFILE: ClientProfileData = {
    companyName: "Demo Client Innovations",
    industry: "Technology & R&D",
    primaryLocation: "Austin, TX",
    contactNumber: "(555) 123-CLIENT"
};

export const MOCK_DEMO_CLIENT: User = {
    id: "demo-client-01",
    email: "client.demo@example.com",
    role: "client",
    name: "Demo Client User",
    isDemo: true,
    companyName: "Demo Client Innovations",
    industry: "Technology & R&D",
    primaryLocation: "Austin, TX",
    contactNumber: "(555) 123-CLIENT",
    createdAt: new Date(),
    updatedAt: new Date()
};

const DEMO_PROVIDER_PROFILE: ProviderProfileData = {
    companyName: "Demo NDT Experts",
    location: "Houston, TX",
    lat: 29.7604,
    lng: -95.3698,
    servicesOffered: [
        { id: "s1", name: "Ultrasonic Testing (UT)", rate: 120, unit: "per hour", currency: "USD", tax: 0 },
        { id: "s2", name: "Magnetic Particle Testing (MT)", rate: 110, unit: "per hour", currency: "USD", tax: 0 },
    ],
    contactNumber: "(713) 555-PROVIDER",
    certifications: [
      { id: "cc1", name: "ISO 9001", category: "Quality Management", expiryDate: new Date("2025-08-01") }
    ],
    personnelQualifications: [
      { id: "pq1", quantity: 5, certificationBody: "ASNT", level: "Level II", expiryDate: new Date("2026-12-31") }
    ],
    isVerified: true,
    availableDocuments: ["General NDT Procedures", "ISO 9001 Cert"],
    baseRate: 95,
    description: "A leading demo provider of NDT services for the energy sector, offering a wide range of advanced inspection techniques.",
    specialization: "Oil & Gas Pipelines",
    rating: 4.8,
    companyLogoUrl: 'https://images.unsplash.com/photo-1582489853490-cd3a53eb4530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aW5kdXN0cnl8ZW58MHx8fHwxNzQ4NDM3Nzc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'industrial site'
};

export const MOCK_DEMO_PROVIDER: User = {
    id: "demo-provider-01",
    email: "provider.demo@example.com",
    role: "provider",
    name: "Demo Provider Contact",
    isDemo: true,
    companyName: DEMO_PROVIDER_PROFILE.companyName,
    location: DEMO_PROVIDER_PROFILE.location,
    lat: DEMO_PROVIDER_PROFILE.lat,
    lng: DEMO_PROVIDER_PROFILE.lng,
    servicesOffered: DEMO_PROVIDER_PROFILE.servicesOffered,
    contactNumber: DEMO_PROVIDER_PROFILE.contactNumber,
    certifications: DEMO_PROVIDER_PROFILE.certifications,
    personnelQualifications: DEMO_PROVIDER_PROFILE.personnelQualifications,
    isVerified: DEMO_PROVIDER_PROFILE.isVerified,
    availableDocuments: DEMO_PROVIDER_PROFILE.availableDocuments,
    baseRate: DEMO_PROVIDER_PROFILE.baseRate,
    description: DEMO_PROVIDER_PROFILE.description,
    specialization: DEMO_PROVIDER_PROFILE.specialization,
    rating: DEMO_PROVIDER_PROFILE.rating,
    companyLogoUrl: DEMO_PROVIDER_PROFILE.companyLogoUrl,
    dataAiHint: DEMO_PROVIDER_PROFILE.dataAiHint,
    createdAt: new Date(),
    updatedAt: new Date()
};


// ==================================
// MOCK DATA FOR PAGES
// ==================================

export const MOCK_PROVIDERS: ServiceProvider[] = [
  {
    id: MOCK_DEMO_PROVIDER.id,
    name: MOCK_DEMO_PROVIDER.companyName,
    location: MOCK_DEMO_PROVIDER.location,
    lat: MOCK_DEMO_PROVIDER.lat,
    lng: MOCK_DEMO_PROVIDER.lng,
    services: MOCK_DEMO_PROVIDER.servicesOffered,
    specialization: MOCK_DEMO_PROVIDER.specialization!,
    rating: MOCK_DEMO_PROVIDER.rating!,
    description: MOCK_DEMO_PROVIDER.description,
    imageUrl: MOCK_DEMO_PROVIDER.companyLogoUrl,
    dataAiHint: MOCK_DEMO_PROVIDER.dataAiHint,
    isVerified: MOCK_DEMO_PROVIDER.isVerified!,
    certifications: MOCK_DEMO_PROVIDER.certifications!,
    personnelQualifications: MOCK_DEMO_PROVIDER.personnelQualifications!,
    isCompany: true,
  },
  {
    id: 'mock-provider-02',
    name: 'Global Inspection Inc.',
    location: 'Chicago, IL',
    lat: 41.8781,
    lng: -87.6298,
    services: [
      { id: "s1", name: 'Radiographic Testing (RT)', rate: 180, unit: 'per hour', currency: "USD", tax: 5 },
      { id: "s2", name: 'Visual Testing (VT)', rate: 90, unit: 'per hour', currency: "USD", tax: 5 },
    ],
    specialization: 'Manufacturing & Aerospace',
    rating: 4.5,
    description: 'Serving the greater Chicago area with top-tier inspection services for manufacturing quality control.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'city skyline',
    isVerified: true,
    certifications: [ { id: "c1", name: 'Nadcap', category: 'Aerospace' } ],
    personnelQualifications: [ {id: "pq1", quantity: 3, certificationBody: "ACCP", level: "Level II"} ],
    isCompany: true,
  },
  {
    id: 'mock-provider-03',
    name: 'Maritime NDT Specialists',
    location: 'Seattle, WA',
    lat: 47.6062,
    lng: -122.3321,
    services: [{ id: "s1", name: 'Ultrasonic Testing (UT)', rate: 150, unit: 'per hour', currency: "USD", tax: 0 }],
    specialization: 'Maritime & Shipping',
    rating: 4.2,
    description: 'Specializing in hull integrity testing and maritime equipment inspections.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'shipping port',
    isVerified: false,
    certifications: [],
    personnelQualifications: [ {id: "pq1", quantity: 2, certificationBody: "ASNT", level: "Level III"} ],
    isCompany: true,
  },
];

export const MOCK_CLIENT_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-mock-01',
    clientId: MOCK_DEMO_CLIENT.id,
    providerId: MOCK_DEMO_PROVIDER.id,
    providerName: MOCK_DEMO_PROVIDER.companyName,
    serviceType: 'Ultrasonic Testing (UT)',
    location: 'Demo Client Main Site',
    description: 'Annual inspection of primary storage tank welds.',
    requestedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedCost: 1200
  },
  {
    id: 'req-mock-02',
    clientId: MOCK_DEMO_CLIENT.id,
    providerId: MOCK_PROVIDERS[1].id,
    providerName: MOCK_PROVIDERS[1].name,
    serviceType: 'Visual Testing (VT)',
    location: 'Demo Client Fab Shop',
    description: 'Post-fabrication visual inspection of 50 new components.',
    requestedDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'In Progress',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedCost: 900
  },
   {
    id: 'req-mock-03',
    clientId: MOCK_DEMO_CLIENT.id,
    providerId: MOCK_PROVIDERS[2].id,
    providerName: MOCK_PROVIDERS[2].name,
    serviceType: 'Leak Testing (LT)',
    location: 'Demo Client Lab Facility',
    description: 'Routine check of all pressurized systems.',
    requestedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Completed',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedCost: 700
  }
];

export const MOCK_PROVIDER_REQUESTS: ServiceRequest[] = [
    // A request assigned to the demo provider
    MOCK_CLIENT_REQUESTS[0],
    // A new pending request not yet assigned to anyone
    {
        id: 'req-mock-04',
        clientId: 'some-other-client-id',
        clientName: "Future Forward Inc.",
        providerId: '',
        providerName: '',
        serviceType: 'Radiographic Testing (RT)',
        location: 'Newark, NJ',
        description: 'Need urgent RT on a new pipeline installation. 100 welds.',
        requestedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedCost: 1500
    }
]
