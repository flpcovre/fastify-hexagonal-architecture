import { User } from '@/domain/user/entities/user';
import { UserRepository } from '@/domain/user/ports/user-repository';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user.use-case';
import { HasherService } from '@/shared/domain/ports/hasher-service';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

describe('CreateUserUseCase', () => {
  let userRepository: UserRepository;
  let hasherService: HasherService;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    vi.clearAllMocks();

    userRepository = {
      findByEmail: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    hasherService = {
      hash: vi.fn(),
      compare: vi.fn(),
    };

    createUserUseCase = new CreateUserUseCase(userRepository, hasherService);
  });

  it('should create a user', async() => {
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    vi.mocked(userRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(hasherService.hash).mockResolvedValue(faker.internet.password());
    vi.mocked(userRepository.create).mockImplementation(() => Promise.resolve());

    const output = await createUserUseCase.execute(input);

    expect(output).toHaveProperty('id');
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(hasherService.hash).toHaveBeenCalledWith(input.password);
    expect(userRepository.create).toHaveBeenCalled();
  });


  it('should throw an error if the user already exists', async() => {
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'admin',
    };

    vi.mocked(userRepository.findByEmail).mockResolvedValue(
      User.make({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: input.email,
        password: faker.internet.password(),
        role: 'admin',
        createdAt: new Date(),
      }),
    );

    await expect(createUserUseCase.execute(input)).rejects.toThrow(new Error('User already exists'));

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(hasherService.hash).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});