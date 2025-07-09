import { z } from 'zod';

export const createChatSchema = z.object({
  phone: z.string(),
});

export const createChatResponseSchema = z.object({
  id: z.string().uuid(),
});

export type CreateChatInput = z.infer<typeof createChatSchema>;