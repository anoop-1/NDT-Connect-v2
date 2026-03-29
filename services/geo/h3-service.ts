export interface GeoLocation { lat: number; lng: number; }
export interface IndexedEntity { id: string; h3Index: string; location: GeoLocation; }
export const H3_RESOLUTION = 7;
export function geoToH3(lat: number, lng: number, resolution?: number): string { return ''; }
export function estimateETA(from: GeoLocation, to: GeoLocation): number { return 0; }
export function matchInspectorsToJob(jobLocation: GeoLocation, inspectors: any[], radius?: number): any[] { return []; }
