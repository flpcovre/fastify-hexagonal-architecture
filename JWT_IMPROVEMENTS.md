# Melhorias na Implementação do JWT

## Resumo das Melhorias

Esta refatoração melhorou significativamente a implementação do JWT na aplicação, focando em:

1. **Eliminação de duplicação de tipos**
2. **Tipagem mais forte e reutilizável**
3. **Utilitários para facilitar o uso**
4. **Middleware melhorado com controle de roles**

## Principais Mudanças

### 1. Tipos Reutilizáveis (`src/shared/domain/ports/jwt-service.ts`)

```typescript
// Antes: Tipos duplicados
export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Depois: Tipos reutilizáveis baseados na entidade User
export type UserJwtData = Pick<User, 'id' | 'name' | 'email' | 'role'>;

export interface JwtPayload extends UserJwtData {
  iat?: number; // issued at
  exp?: number; // expiration
}

export interface AuthResponse {
  token: string;
  user: UserJwtData;
}
```

### 2. Tipagem do FastifyJWT (`src/adapters/http/types/fastify-jwt.d.ts`)

```typescript
// Antes: Duplicação de tipos
interface FastifyJWT {
  payload: { id: string; name: string; email: string; role: string };
  user: { id: string; name: string; email: string; role: string };
}

// Depois: Reutilização de tipos
interface FastifyJWT {
  payload: UserJwtData & { iat?: number; exp?: number };
  user: UserJwtData;
}
```

### 3. Utilitários JWT (`src/shared/utils/jwt.utils.ts`)

```typescript
// Função para extrair dados do usuário do JWT
export function extractUserFromJwt(payload: JwtPayload): UserJwtData

// Função para criar dados JWT a partir de uma entidade User
export function createUserJwtData(user: User): UserJwtData

// Função para validar payload JWT
export function isValidUserJwtPayload(payload: unknown): payload is JwtPayload
```

### 4. Use Case Refatorado (`src/domain/user/use-cases/authenticate-user.use-case.ts`)

```typescript
// Antes: Duplicação de dados
const token = this.jwtService.sign({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

return {
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
};

// Depois: Uso de utilitário
const userJwtData = createUserJwtData(user);
const token = this.jwtService.sign(userJwtData);

return {
  token,
  user: userJwtData,
};
```

### 5. Middleware Melhorado (`src/adapters/http/middlewares/auth.middleware.ts`)

```typescript
// Middleware de autenticação com tipagem melhorada
export async function authMiddleware<T extends RouteGenericInterface>(
  request: AuthenticatedRequest<T>,
  reply: FastifyReply,
)

// Middleware de controle de roles
export function requireRole(allowedRoles: UserJwtData['role'][])
```

## Como Usar

### 1. Autenticação Básica

```typescript
fastify.get('/profile', {
  preHandler: authMiddleware,
}, async (request) => {
  const user = request.authenticatedUser;
  // user está tipado como UserJwtData
});
```

### 2. Controle de Roles

```typescript
// Apenas admin
fastify.get('/admin/users', {
  preHandler: [authMiddleware, requireRole(['admin'])],
}, async (request) => {
  // Apenas admins podem acessar
});

// Admin ou supervisor
fastify.get('/supervisor/dashboard', {
  preHandler: [authMiddleware, requireRole(['admin', 'supervisor'])],
}, async (request) => {
  // Admins e supervisores podem acessar
});
```

### 3. Criação de Tokens

```typescript
// No use case de autenticação
const userJwtData = createUserJwtData(user);
const token = this.jwtService.sign(userJwtData);
```

## Benefícios

1. **DRY (Don't Repeat Yourself)**: Eliminação de duplicação de tipos
2. **Type Safety**: Tipagem mais forte e consistente
3. **Manutenibilidade**: Mudanças na estrutura do usuário refletem automaticamente no JWT
4. **Flexibilidade**: Fácil extensão para novos campos
5. **Reutilização**: Utilitários podem ser usados em toda a aplicação
6. **Controle de Acesso**: Middleware de roles simplifica a implementação de autorização

## Compatibilidade

Todas as mudanças são retrocompatíveis. O comportamento existente é mantido, apenas com melhor tipagem e organização do código. 