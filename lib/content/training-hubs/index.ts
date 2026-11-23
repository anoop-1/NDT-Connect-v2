import type { TrainingHub } from './types';
import { ALL_TRAINING_HUBS } from './all';
export const TRAINING_HUBS: TrainingHub[] = ALL_TRAINING_HUBS;
export const getTrainingHub = (slug: string) => TRAINING_HUBS.find(c => c.slug === slug);
export type { TrainingHub, TrainingSchool } from './types';
