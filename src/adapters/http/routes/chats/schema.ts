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

export const chatMessageParamsSchema = z.object({
  chatId: z.string().uuid(),
});

export const createChatMessageSchema = z.object({
  userId: z.string().uuid(),
  content: z.string(),
  type: z.enum(['text', 'image', 'audio', 'video', 'file', 'location', 'contact']),
});

export const createMessageResponseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
}).describe('Message created successfully');

export type CreateChatInput = z.infer<typeof createChatSchema>;
export type CreateChatMessageInput = z.infer<typeof createChatMessageSchema>;
export type ChatMessageParams = z.infer<typeof chatMessageParamsSchema>;