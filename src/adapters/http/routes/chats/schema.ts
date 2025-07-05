import { z } from 'zod';

export const createChatSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string(),
});

export const createChatResponseSchema = z.object({
  id: z.string(),
  customer: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    phone: z.string(),
    createdAt: z.date(),
  }),
  status: z.enum(['active', 'finished', 'inProgress']),
  createdAt: z.date(),
});

export type CreateChatInput = z.infer<typeof createChatSchema>;