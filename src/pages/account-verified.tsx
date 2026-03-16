import React from 'react';

export default function AccountVerified() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Account Verified!</h1>
      <p className="mb-4">Your account has been successfully verified. You can now log in.</p>
      <a href="/login" className="text-blue-600 underline">Go to Login</a>
    </div>
  );
}
