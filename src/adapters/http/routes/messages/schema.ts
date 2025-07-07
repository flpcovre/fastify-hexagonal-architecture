import z from 'zod';

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

export const inboundMessageSchema = z.object({
  id: z.string(),
  from: z.string(),
  timestamp: z.string(),
  type: z.enum(['text', 'image', 'audio', 'video', 'file', 'location', 'contact']),
  content: z.string(),
  media: z.object({
    id: z.string(),
    mimeType: z.string(),
    fileName: z.string().optional(),
    mediaKey: z.string().optional(),
  }).optional(),
});

export const inboundMessageResponseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
}).describe('Message created successfully');

export type CreateChatMessageInput = z.infer<typeof createChatMessageSchema>;
export type ChatMessageParams = z.infer<typeof chatMessageParamsSchema>;
export type InboundMessageInput = z.infer<typeof inboundMessageSchema>;