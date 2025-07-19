import z from 'zod';

export const messageTypeSchema = z.enum(['text', 'image', 'audio', 'file']);

export const chatMessageParamsSchema = z.object({
  chatId: z.string().uuid(),
});

export const createChatMessageSchema = z.object({
  userId: z.string().uuid(),
  content: z.string(),
  type: messageTypeSchema,
});

export const createMessageResponseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
}).describe('Message created successfully');

export const inboundMessageSchema = z.object({
  id: z.string(),
  name: z.string(),
  from: z.string(),
  timestamp: z.string(),
  type: messageTypeSchema,
  content: z.string(),
  media: z.object({
    id: z.string(),
    type: messageTypeSchema,
    mimeType: z.string(),
    fileName: z.string().optional(),
    mediaKey: z.string().optional(),
  }).optional(),
});

export const inboundMessageResponseSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  reply: z.string().optional(),
  isTerminal: z.boolean().optional(),
}).describe('Message created successfully');

export type CreateChatMessageInput = z.infer<typeof createChatMessageSchema>;
export type ChatMessageParams = z.infer<typeof chatMessageParamsSchema>;
export type InboundMessageInput = z.infer<typeof inboundMessageSchema>;