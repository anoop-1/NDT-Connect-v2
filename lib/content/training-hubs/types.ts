// NDT training city hubs — 2,000+ word, cited, city-specific guides served at /training/<slug> by the
// side-car (nginx routes only these slugs; all other /training URLs stay on the main app).
import type { CityHub } from '../city-hubs/types';
export interface TrainingSchool {
  name: string;          // provider name as published
  url: string;           // provider's own page
  location: string;      // city / area
  offers: string;        // methods / programs, from the provider's published info
  type: string;          // 'Community college' | 'Private school' | 'University' | 'Online' ...
}
export interface TrainingHub extends CityHub {
  schools: TrainingSchool[];
}
