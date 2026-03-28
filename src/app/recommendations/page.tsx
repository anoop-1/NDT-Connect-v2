// app/recommendations/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";

export default function RecommendationsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/find-providers");
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Activity className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Redirecting to Find Providers...</span>
    </div>
  );
}
