import { User } from '@/domain/user/entities/user';
import { UserRepository } from '@/domain/user/ports/user-repository';
import { PrismaClient } from '@/infra/database/prisma/generated';

export class UserRepositoryPrisma implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: user,
    });
  }
}