import type { NdtLeader } from './types';
import anoop from './anoop-rayavarapu';
import abufour from './mohammed-abufour';
import ajay from './ajay-pasupuleti';
import eddie from './eddie-pompa';
import daniel from './daniel-hoke';
import couture from './neal-couture';
import bala from './krishnan-balasubramaniam';
import georgeson from './gary-georgeson';
import garcia from './gregory-garcia';
import zoughi from './reza-zoughi';
import light from './glenn-light';
import udpa from './lalita-udpa';
import rose from './joseph-rose';

export const NDT_LEADERS: NdtLeader[] = [anoop, abufour, ajay, eddie, daniel, couture, bala, georgeson, garcia, zoughi, light, udpa, rose];
export const getLeader = (slug: string) => NDT_LEADERS.find(l => l.slug === slug);
export type { NdtLeader } from './types';
