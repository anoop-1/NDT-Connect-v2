
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginViewManager } from "@/components/auth/LoginViewManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Activity } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to NDT Connect</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="flex justify-center items-center p-8"><Activity className="h-6 w-6 animate-spin text-primary" /> <span className="ml-2">Loading...</span></div>}>
            <LoginViewManager />
          </Suspense>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button variant="link" asChild className="p-0">
              <Link href="/register">
                Register here
              </Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

    