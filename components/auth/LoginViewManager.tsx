
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, MailWarning } from 'lucide-react';
import { LoginForm } from './LoginForm';

export function LoginViewManager() {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status');
  const email = searchParams?.get('email');

  const [isVerificationSimulated, setIsVerificationSimulated] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  useEffect(() => {
    if (status === 'verification_pending' && email) {
      setShowVerificationMessage(true);
    }
  }, [status, email]);

  const handleSimulateVerification = () => {
    setIsVerificationSimulated(true);
    setShowVerificationMessage(false); // Hide the message after "verification"
  };

  if (showVerificationMessage && !isVerificationSimulated) {
    return (
      <div className="space-y-4 text-center">
        <Alert variant="default" className="bg-primary/10 border-primary/30 text-primary">
          <MailWarning className="h-5 w-5" />
          <AlertTitle className="font-semibold">Account Pending Verification</AlertTitle>
          <AlertDescription>
            Your account for <span className="font-medium">{decodeURIComponent(email || '')}</span> is almost ready!
            For this demo, please click the button below to simulate email verification and activate your account.
          </AlertDescription>
        </Alert>
        <Button onClick={handleSimulateVerification} className="w-full">
          <CheckCircle className="mr-2 h-4 w-4" />
          Simulate Email Verification & Proceed
        </Button>
      </div>
    );
  }

  return <LoginForm />;
}

    