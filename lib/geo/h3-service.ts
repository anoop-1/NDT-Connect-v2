/**
 * H3 Geo-Spatial Service for NDTConnect
 * Uber's H3 hexagonal hierarchical spatial index for efficient geo-matching
 */

import * as h3 from 'h3-js';

// H3 resolution levels for different use cases
export const H3_RESOLUTION = {
  CITY: 4,        // ~1,770 km² - city-level clustering
  DISTRICT: 6,    // ~36 km² - district matching
  NEIGHBORHOOD: 8, // ~0.7 km² - neighborhood precision
  STREET: 10,     // ~0.015 km² - street-level precision
  PRECISE: 12,    // ~0.0003 km² - building precision
} as const;

export type H3Resolution = typeof H3_RESOLUTION[keyof typeof H3_RESOLUTION];

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface IndexedEntity extends GeoLocation {
  id: string;
  h3Index: string;
  h3Indexes?: Record<number, string>; // Resolution -> Index mapping
}

export interface MatchResult<T> {
  entity: T;
  distance: number; // in kilometers
  h3Distance: number; // in grid cells
}

/**
 * Convert lat/lng to H3 index at specified resolution
 */
export function geoToH3(location: GeoLocation, resolution: H3Resolution = H3_RESOLUTION.NEIGHBORHOOD): string {
  return h3.latLngToCell(location.lat, location.lng, resolution);
}

/**
 * Convert H3 index back to center lat/lng
 */
export function h3ToGeo(h3Index: string): GeoLocation {
  const [lat, lng] = h3.cellToLatLng(h3Index);
  return { lat, lng };
}

/**
 * Get all H3 indexes within K rings from center
 * Used for efficient spatial queries instead of O(N) distance calculations
 */
export function getKRingIndexes(centerIndex: string, k: number): string[] {
  return h3.gridDisk(centerIndex, k);
}

/**
 * O(1) lookup for nearby entities using H3 K-ring search
 * Replaces O(N) distance calculations with O(K²) grid lookup
 */
export function findNearbyEntities<T extends IndexedEntity>(
  centerLocation: GeoLocation,
  entities: T[],
  maxRings: number = 3,
  resolution: H3Resolution = H3_RESOLUTION.NEIGHBORHOOD
): MatchResult<T>[] {
  const centerIndex = geoToH3(centerLocation, resolution);
  const nearbyIndexes = new Set(getKRingIndexes(centerIndex, maxRings));
  
  const results: MatchResult<T>[] = [];
  
  for (const entity of entities) {
    const entityIndex = entity.h3Indexes?.[resolution] || geoToH3(entity, resolution);
    
    if (nearbyIndexes.has(entityIndex)) {
      const distance = haversineDistance(centerLocation, entity);
      const h3Distance = h3.gridDistance(centerIndex, entityIndex);
      
      results.push({
        entity,
        distance,
        h3Distance,
      });
    }
  }
  
  // Sort by distance
  return results.sort((a, b) => a.distance - b.distance);
}

/**
 * Match inspectors to jobs using H3 spatial indexing
 * Efficient O(K²) instead of O(N) distance calculations
 */
export function matchInspectorsToJob<T extends IndexedEntity>(
  jobLocation: GeoLocation,
  inspectors: T[],
  options: {
    maxDistanceKm?: number;
    maxResults?: number;
    resolution?: H3Resolution;
  } = {}
): MatchResult<T>[] {
  const {
    maxDistanceKm = 50,
    maxResults = 10,
    resolution = H3_RESOLUTION.NEIGHBORHOOD,
  } = options;

  // Calculate approximate K rings needed for max distance
  // At resolution 8, each ring is roughly 0.4km
  const avgHexEdgeKm = getHexEdgeLength(resolution);
  const estimatedRings = Math.ceil(maxDistanceKm / (avgHexEdgeKm * 2)) + 1;
  
  const matches = findNearbyEntities(jobLocation, inspectors, estimatedRings, resolution);
  
  return matches
    .filter(m => m.distance <= maxDistanceKm)
    .slice(0, maxResults);
}

/**
 * Create H3 indexes for an entity at multiple resolutions
 * Enables efficient queries at different zoom levels
 */
export function indexEntityAtMultipleResolutions(location: GeoLocation): Record<number, string> {
  const indexes: Record<number, string> = {};
  
  for (const [, resolution] of Object.entries(H3_RESOLUTION)) {
    indexes[resolution] = geoToH3(location, resolution as H3Resolution);
  }
  
  return indexes;
}

/**
 * Calculate cluster statistics for defect/corrosion density heatmaps
 */
export function calculateHexagonDensity<T extends GeoLocation>(
  points: T[],
  resolution: H3Resolution = H3_RESOLUTION.DISTRICT
): Map<string, { count: number; center: GeoLocation }> {
  const density = new Map<string, { count: number; center: GeoLocation }>();
  
  for (const point of points) {
    const h3Index = geoToH3(point, resolution);
    
    if (density.has(h3Index)) {
      density.get(h3Index)!.count++;
    } else {
      density.set(h3Index, {
        count: 1,
        center: h3ToGeo(h3Index),
      });
    }
  }
  
  return density;
}

/**
 * Get hexagon boundary for map rendering
 */
export function getHexagonBoundary(h3Index: string): GeoLocation[] {
  return h3.cellToBoundary(h3Index).map(([lat, lng]) => ({ lat, lng }));
}

/**
 * Get all hexagons covering a bounding box (for map tiles)
 */
export function getHexagonsInBoundingBox(
  sw: GeoLocation,
  ne: GeoLocation,
  resolution: H3Resolution = H3_RESOLUTION.NEIGHBORHOOD
): string[] {
  const polygon: [number, number][] = [
    [sw.lat, sw.lng],
    [sw.lat, ne.lng],
    [ne.lat, ne.lng],
    [ne.lat, sw.lng],
    [sw.lat, sw.lng],
  ];
  
  return h3.polygonToCells(polygon, resolution);
}

/**
 * Calculate ETA based on H3 grid distance and average speed
 */
export function estimateETA(
  fromLocation: GeoLocation,
  toLocation: GeoLocation,
  averageSpeedKmh: number = 40
): { distanceKm: number; etaMinutes: number; confidence: number } {
  const distanceKm = haversineDistance(fromLocation, toLocation);
  const etaMinutes = (distanceKm / averageSpeedKmh) * 60;
  
  // Confidence decreases with distance (traffic uncertainty)
  const confidence = Math.max(0.5, 1 - (distanceKm / 100) * 0.3);
  
  return {
    distanceKm: Math.round(distanceKm * 100) / 100,
    etaMinutes: Math.round(etaMinutes),
    confidence: Math.round(confidence * 100) / 100,
  };
}

// Helper: Haversine distance formula
function haversineDistance(a: GeoLocation, b: GeoLocation): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  
  const h = sinDLat * sinDLat + 
            Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng;
  
  return 2 * R * Math.asin(Math.sqrt(h));
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Approximate edge length at different resolutions (in km)
function getHexEdgeLength(resolution: H3Resolution): number {
  const edgeLengths: Record<number, number> = {
    4: 22.6,
    6: 3.23,
    8: 0.46,
    10: 0.066,
    12: 0.0094,
  };
  return edgeLengths[resolution] || 0.46;
}

/**
 * RBI-driven inspection prioritization
 * Calculates priority score based on risk-based inspection data
 */
export interface RBIPriority {
  assetId: string;
  location: GeoLocation;
  riskScore: number; // 0-100
  lastInspectionDate: Date;
  defectDensity: number;
}

export function prioritizeInspections(
  assets: RBIPriority[],
  maxResults: number = 20
): RBIPriority[] {
  const now = Date.now();
  
  return assets
    .map(asset => ({
      ...asset,
      priorityScore: calculatePriorityScore(asset, now),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, maxResults);
}

function calculatePriorityScore(asset: RBIPriority, now: number): number {
  const daysSinceInspection = (now - asset.lastInspectionDate.getTime()) / (1000 * 60 * 60 * 24);
  const ageFactor = Math.min(daysSinceInspection / 365, 2); // Cap at 2x for 2 years
  
  return (asset.riskScore * 0.4) + 
         (asset.defectDensity * 0.3) + 
         (ageFactor * 30);
}
