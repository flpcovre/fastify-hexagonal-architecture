import { z } from 'zod';

export const authSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const authResponseSchema = z.object({
  token: z.string(),
  expiresIn: z.string().describe('Tempo de expiração do token (ex: "24h", "7d")'),
  expiresAt: z.string().describe('Data/hora de expiração do token em formato ISO'),
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
  }),
});

export const profileResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export const unauthorizedErrorSchema = z.object({
  message: z.string(),
  error: z.string(),
});

export type AuthInput = z.infer<typeof authSchema>;