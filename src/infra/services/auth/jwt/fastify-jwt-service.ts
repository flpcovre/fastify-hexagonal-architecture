import { JwtService, JwtPayload, UserJwtData, JwtSignResult } from '@/shared/domain/ports/jwt-service';
import { calculateExpirationDate } from '@/shared/utils/helpers';
import { FastifyInstance } from 'fastify';

export class FastifyJwtService implements JwtService {
  constructor(
    private readonly fastify: FastifyInstance,
  ) {}

  public sign(payload: UserJwtData): JwtSignResult {
    const token = this.fastify.jwt.sign(payload);

    const expiresIn = this.fastify.jwt.options.sign?.expiresIn || '24h';

    const now = new Date();
    const expiresAt = calculateExpirationDate(now, expiresIn);

    return {
      token,
      expiresIn: expiresIn as string,
      expiresAt: expiresAt.toISOString(),
    };
  }

  public verify<T extends JwtPayload = JwtPayload>(token: string): T {
    return this.fastify.jwt.verify(token) as T;
  }
}