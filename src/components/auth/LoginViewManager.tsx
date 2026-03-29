"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, MailWarning } from 'lucide-react';
import { LoginForm } from './LoginForm';

export function LoginViewManager() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const email = searchParams.get('email');

  const [isVerificationSimulated, setIsVerificationSimulated] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  useEffect(() => {
    setIsVerificationSimulated(false);
    
    if (status === 'verification_pending' && email) {
      setShowVerificationMessage(true);
    } else {
      setShowVerificationMessage(false);
    }
  }, [status, email]); 

  if (showVerificationMessage && !isVerificationSimulated) {
    return (
      <div className="space-y-4 text-center">
        <Alert variant="default" className="bg-primary/10 border-primary/30 text-primary">
          <MailWarning className="h-5 w-5" />
          <AlertTitle className="font-semibold">Account Pending Verification</AlertTitle>
          <AlertDescription>
            Your account for <span className="font-medium">{decodeURIComponent(email || '')}</span> is almost ready!
            please click on the link in your email to verify your account.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <LoginForm />;
}
