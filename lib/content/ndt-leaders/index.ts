import type { NdtLeader } from './types';
import anoop from './anoop-rayavarapu';
import abufour from './mohammed-abufour';
import ajay from './ajay-pasupuleti';

export const NDT_LEADERS: NdtLeader[] = [anoop, abufour, ajay];
export const getLeader = (slug: string) => NDT_LEADERS.find(l => l.slug === slug);
export type { NdtLeader } from './types';
