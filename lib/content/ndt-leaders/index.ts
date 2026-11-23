import type { NdtLeader } from './types';
import anoop from './anoop-rayavarapu';
import abufour from './mohammed-abufour';
import ajay from './ajay-pasupuleti';
import eddie from './eddie-pompa';
import daniel from './daniel-hoke';

export const NDT_LEADERS: NdtLeader[] = [anoop, abufour, ajay, eddie, daniel];
export const getLeader = (slug: string) => NDT_LEADERS.find(l => l.slug === slug);
export type { NdtLeader } from './types';
