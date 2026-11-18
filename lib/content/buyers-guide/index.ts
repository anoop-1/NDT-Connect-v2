import type { BuyerGuide } from './types';
import gulf from './gulf-coast-refinery-petrochemical';
import permian from './permian-midstream-pipeline';
import aero from './aerospace-seattle-wichita';

export const BUYER_GUIDES: BuyerGuide[] = [gulf, permian, aero];
export const getGuide = (slug: string) => BUYER_GUIDES.find(g => g.slug === slug);
export type { BuyerGuide } from './types';
