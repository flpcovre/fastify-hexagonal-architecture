import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['admin', 'supervisor', 'attendant']),
});

export const createUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'supervisor', 'attendant']),
  createdAt: z.date(),
}).describe('User created successfully');

export const getUserResponseSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'supervisor', 'attendant']),
  createdAt: z.date(),
}));

export type CreateUserInput = z.infer<typeof createUserSchema>
export type GetUserResponse = z.infer<typeof getUserResponseSchema>