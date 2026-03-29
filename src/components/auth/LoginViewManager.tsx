"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailWarning } from 'lucide-react';
import { LoginForm } from './LoginForm';

export function LoginViewManager() {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status');
  const email = searchParams?.get('email');

  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  useEffect(() => {
    if (status === 'verification_pending' && email) {
      setShowVerificationMessage(true);
    }
  }, [status, email]);

  if (showVerificationMessage) {
    return (
      <div className="space-y-4">
        <Alert variant="default" className="bg-primary/10 border-primary/30 text-primary">
          <MailWarning className="h-5 w-5" />
          <AlertTitle className="font-semibold">Verify Your Email</AlertTitle>
          <AlertDescription>
            A verification email has been sent to <span className="font-medium">{decodeURIComponent(email || '')}</span>.
            Please check your inbox and click the verification link to activate your account, then log in below.
          </AlertDescription>
        </Alert>
        <LoginForm />
      </div>
    );
  }

  return <LoginForm />;
}
