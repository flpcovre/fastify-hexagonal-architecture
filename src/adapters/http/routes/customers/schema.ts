import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string(),
});

export const createCustomerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  createdAt: z.date(),
}).describe('Customer created successfully');

export const getCustomerResponseSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  createdAt: z.date(),
}));

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;