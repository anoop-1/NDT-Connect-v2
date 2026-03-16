
// src/components/client/RecommendationForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
type OptimizeServiceProviderRecommendationsInput = {
  location: string;
  serviceType: string;
  specialization: string;
  standard?: string;
  assetToBeInspected?: string;
};
import { Sparkles } from "lucide-react";

const NDT_SERVICES = [
  "Ultrasonic Testing (UT)",
  "Magnetic Particle Testing (MT)",
  "Liquid Penetrant Testing (PT)",
  "Radiographic Testing (RT)",
  "Eddy Current Testing (ET)",
  "Visual Testing (VT)",
  "Leak Testing (LT)",
  "Acoustic Emission Testing (AET)",
  "Phased Array Ultrasonic Testing (PAUT)",
  "Time-of-Flight Diffraction (TOFD)",
  "Other",
];

const formSchema = z.object({
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  serviceType: z.string().min(1, { message: "Please select a service type." }),
  specialization: z.string().min(3, { message: "Specialization/Industry must be at least 3 characters." }),
  standard: z.string().optional(),
  assetToBeInspected: z.string().optional(),
});

interface RecommendationFormProps {
  onSubmit: (data: OptimizeServiceProviderRecommendationsInput) => void;
  isLoading: boolean;
}

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      serviceType: "",
      specialization: "",
      standard: "",
      assetToBeInspected: "",
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    const submissionData: OptimizeServiceProviderRecommendationsInput = {
        location: values.location,
        serviceType: values.serviceType,
        specialization: values.specialization,
        standard: values.standard || undefined, // Ensure optional fields are undefined if empty
        assetToBeInspected: values.assetToBeInspected || undefined, // Ensure optional fields are undefined if empty
    };
    onSubmit(submissionData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Houston, TX or Zip Code" {...field} />
              </FormControl>
              <FormDescription>
                Enter the city, state, or zip code where the service is needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NDT Service Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an NDT service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {NDT_SERVICES.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the primary NDT service you require.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Specialization / Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Aerospace, Oil & Gas, Weld Inspection" {...field} />
              </FormControl>
              <FormDescription>
                Specify any particular industry, material, or component specialization needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="standard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicable Standard (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., ASME Sec V, API 1104, ISO 9712" {...field} />
              </FormControl>
              <FormDescription>
                If a specific inspection standard needs to be followed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assetToBeInspected"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset to be Inspected (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Pressure Vessel, Pipeline Weld, Bridge Girder" {...field} />
              </FormControl>
              <FormDescription>
                Describe the item or component requiring inspection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Getting Recommendations...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Recommendations
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
