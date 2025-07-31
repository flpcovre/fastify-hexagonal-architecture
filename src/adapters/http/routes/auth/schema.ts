import { z } from 'zod';

export const authSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const authResponseSchema = z.object({
  token: z.string(),
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

export type AuthInput = z.infer<typeof authSchema>;
export type ProfileResponse = z.infer<typeof profileResponseSchema>