import { JwtService, JwtPayload, UserJwtData } from '@/shared/domain/ports/jwt-service';
import { FastifyInstance } from 'fastify';

export class FastifyJwtService implements JwtService {
  constructor(
    private readonly fastify: FastifyInstance,
  ) {}

  public sign(payload: UserJwtData): string {
    return this.fastify.jwt.sign(payload);
  }

  public verify<T extends JwtPayload = JwtPayload>(token: string): T {
    return this.fastify.jwt.verify(token) as T;
  }

  public extractUserData(payload: JwtPayload): UserJwtData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, ...userData } = payload;
    return userData;
  }
}