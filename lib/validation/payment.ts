import { z } from 'zod';

export const PaymentCheckoutSchema = z.object({
  providerServiceId: z.string().min(1),
  buyerId: z.string().min(1),
});

export type PaymentCheckoutInput = z.infer<typeof PaymentCheckoutSchema>;
