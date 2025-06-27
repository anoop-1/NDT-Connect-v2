// src/app/find-providers/map/page.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPinOff } from 'lucide-react';

export default function MapRemovedPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-3 w-fit">
            <MapPinOff className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle>Map View Removed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The interactive map view has been removed to improve application stability.
            You can use the list view to find service providers.
          </p>
          <Button asChild>
            <Link href="/find-providers">
              Back to Find Providers
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
