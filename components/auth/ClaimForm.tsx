'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  token: string;
  company: string;
  email: string;
}

export default function ClaimForm({ token, company, email }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Could not claim this profile.');
        setLoading(false);
        return;
      }
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'sign_up', { method: 'claim_listing' });
      }
      router.push('/provider-dashboard');
    } catch (err: any) {
      setError(String(err));
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {email && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Account email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
          />
        </div>
      )}
      <div>
        <label htmlFor="claim-password" className="block text-sm font-medium text-slate-700 mb-1">
          Set a password
        </label>
        <input
          id="claim-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60 transition"
      >
        {loading ? 'Activating…' : `Activate ${company || 'my'} listing`}
      </button>
      <p className="text-center text-xs text-slate-500">
        By activating you agree to the NDT Connect terms. Free to list.
      </p>
    </form>
  );
}
