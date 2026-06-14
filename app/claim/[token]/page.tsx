import type { Metadata } from 'next';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import ClaimForm from '@/components/auth/ClaimForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Claim your free NDT Connect listing',
  robots: { index: false, follow: false },
};

interface Props { params: { token: string } }

export default async function ClaimPage({ params }: Props) {
  await dbConnect();
  const stub = await User.findOne({ claimToken: params.token })
    .select('name email claimed role profileData')
    .lean<{ name?: string; email?: string; claimed?: boolean; profileData?: any }>();

  const invalid = !stub || stub.claimed;

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {invalid ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Link unavailable</h1>
            <p className="text-slate-600 mb-6">
              This claim link is invalid or the profile has already been claimed.
            </p>
            <Link href="/login" className="text-primary underline">Log in</Link>
            <span className="text-slate-400"> · </span>
            <Link href="/register?role=provider" className="text-primary underline">Create a profile</Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Free listing</p>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Claim {stub!.name || 'your company'}&apos;s profile
              </h1>
              <p className="text-slate-600 mt-2 text-sm">
                We&apos;ve reserved a free NDT Connect provider listing for{' '}
                <strong>{stub!.name}</strong>. Set a password to activate it, get found by clients, and
                start receiving inspection job requests. Free — no card required.
              </p>
            </div>
            <ClaimForm token={params.token} company={stub!.name || ''} email={stub!.email || ''} />
          </>
        )}
      </div>
    </div>
  );
}
