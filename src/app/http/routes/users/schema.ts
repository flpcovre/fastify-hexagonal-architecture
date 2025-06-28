import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const createUserResponseSchema = z.object  ({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
}).describe('User created successfully');

export const getUserResponseSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
}));

export type CreateUserInput = z.infer<typeof createUserSchema>
