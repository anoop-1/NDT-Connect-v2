// This directory exists because it was created before the final path was
// decided. Industry pages live at /ndt-services/[city]/industries/[industry]/.
// This file redirects any request that somehow lands here to the canonical URL.
import { redirect } from 'next/navigation';
interface Props { params: Promise<{ city: string; industry: string }> }
export async function generateStaticParams() { return []; }
export default async function DeprecatedIndustryFallback({ params }: Props) {
  const { city, industry } = await params;
  redirect(`/ndt-services/${city}/industries/${industry}`);
}
