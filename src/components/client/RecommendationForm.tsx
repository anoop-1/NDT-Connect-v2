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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OptimizeServiceProviderRecommendationsInput } from "@/ai/flows/optimize-service-provider-recommendations";
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
  specialization: z.string().min(3, { message: "Specialization must be at least 3 characters." }),
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
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
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
        
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Getting Recommendations...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />