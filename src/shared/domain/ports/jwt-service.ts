import { User } from '@/domain/user/entities/user';

export type UserJwtData = Pick<User, 'id' | 'name' | 'email' | 'role'>;

export interface JwtPayload extends UserJwtData {
  iat?: number;
  exp?: number;
}

export interface JwtService {
  sign(payload: UserJwtData): string;
  verify<T extends JwtPayload = JwtPayload>(token: string): T;
  extractUserData(payload: JwtPayload): UserJwtData;
}