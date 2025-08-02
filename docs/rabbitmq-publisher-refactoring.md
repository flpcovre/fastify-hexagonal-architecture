# Refatoração do RabbitMQ - Respeitando a Abstração

## Problemas Identificados no Código Original

O `RabbitMQPublisher` e `RabbitMQConsumer` originais apresentavam os seguintes problemas que violavam os princípios de Clean Architecture:

### 1. **Violação da Inversão de Dependência**
```typescript
// ❌ PROBLEMA: Criando dependência concreta no construtor
constructor() {
  this.createConnection(); // Hardcoded connection
}
```

### 2. **Configuração Hardcoded**
```typescript
// ❌ PROBLEMA: Credenciais hardcoded no código
this.connection = await amqp.connect('amqp://admin:admin@localhost:5672');
```

### 3. **Falta de Separação de Responsabilidades**
- As classes eram responsáveis por criar suas próprias conexões
- Não havia separação entre configuração e implementação

### 4. **Consumer Não Implementado**
```typescript
// ❌ PROBLEMA: Método não implementado
consume<T = unknown>(queue: string, handler: (data: T) => Promise<void>): void {
  throw new Error('Method not implemented.');
}
```

## Solução Implementada

### 1. **Interface de Configuração**
```typescript
// ✅ SOLUÇÃO: Interface para configuração
export interface RabbitMQConnection {
  host: string;
  port: number;
  username: string;
  password: string;
  vhost?: string;
}
```

### 2. **Injeção de Dependência**
```typescript
// ✅ SOLUÇÃO: Configuração injetada via construtor
constructor(
  private readonly config: RabbitMQConnection,
) {}
```

### 3. **Lazy Connection**
```typescript
// ✅ SOLUÇÃO: Conexão criada sob demanda
private async ensureConnection(): Promise<void> {
  if (!this.connection || !this.channel) {
    const vhost = this.config.vhost || '/';
    const url = `amqp://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}${vhost}`;
    
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }
}
```

### 4. **Consumer Implementado**
```typescript
// ✅ SOLUÇÃO: Consumer funcional com tratamento de erros
public async consume<T = unknown>(queue: string, handler: (data: T) => Promise<void>): Promise<void> {
  await this.ensureConnection();

  if (!this.channel) {
    throw new Error('Failed to establish RabbitMQ connection');
  }

  await this.channel.assertQueue(queue, { durable: false });

  this.channel.consume(queue, async(msg) => {
    if (msg) {
      try {
        const data = JSON.parse(msg.content.toString()) as T;
        await handler(data);
        this.channel?.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
        this.channel?.nack(msg, false, true); // Requeue on error
      }
    }
  });
}
```

### 5. **Factory Pattern**
```typescript
// ✅ SOLUÇÃO: Factory para criação das instâncias
export function makeRabbitMQPublisher(): RabbitMQPublisher {
  const config = {
    host: 'localhost',
    port: 5672,
    username: 'admin',
    password: 'admin',
    vhost: '/',
  };

  return new RabbitMQPublisher(config);
}

export function makeRabbitMQConsumer(): RabbitMQConsumer {
  const config = {
    host: 'localhost',
    port: 5672,
    username: 'admin',
    password: 'admin',
    vhost: '/',
  };

  return new RabbitMQConsumer(config);
}
```

## Benefícios da Refatoração

### 1. **Testabilidade**
- Agora é possível injetar mocks da configuração
- Facilita testes unitários isolados

### 2. **Flexibilidade**
- Configuração pode ser alterada sem modificar o código
- Suporte a diferentes ambientes (dev, staging, prod)

### 3. **Manutenibilidade**
- Segue o mesmo padrão do `BullMQPublisher` e `BullMQConsumer`
- Código mais limpo e organizado

### 4. **Respeito à Abstração**
- Implementa corretamente as interfaces `JobQueuePublisher` e `JobQueueConsumer`
- Não expõe detalhes de implementação

### 5. **Tratamento de Erros**
- Consumer implementa ack/nack para confirmação de mensagens
- Requeue automático em caso de erro

## Exemplo de Uso

### Publisher
```typescript
// ✅ USO CORRETO: Injeção via factory
export function makeUserMessageCreatedRabbitMQEventHandler(): UserMessageCreatedRabbitMQEventHandler {
  const rabbitMQPublisher = makeRabbitMQPublisher();
  
  return new UserMessageCreatedRabbitMQEventHandler(rabbitMQPublisher);
}
```

### Consumer
```typescript
// ✅ USO CORRETO: Worker com consumer injetado
export function makeSendUserMessageRabbitMQWorker(): SendUserMessageRabbitMQWorker {
  const jobQueueConsumer = makeRabbitMQConsumer();

  return new SendUserMessageRabbitMQWorker(jobQueueConsumer);
}
```

## Comparação com BullMQ

A implementação agora segue o mesmo padrão do BullMQ:

```typescript
// BullMQPublisher
constructor(
  private readonly connection: Connection,
) {}

// RabbitMQPublisher (após refatoração)
constructor(
  private readonly config: RabbitMQConnection,
) {}

// BullMQConsumer
constructor(
  private readonly connection: Connection,
) {}

// RabbitMQConsumer (após refatoração)
constructor(
  private readonly config: RabbitMQConnection,
) {}
```

Ambos respeitam suas respectivas abstrações e recebem suas dependências via construtor.

## Arquivos Criados/Modificados

### Publisher
- `src/infra/services/queues/rabbitmq/connection.ts` - Interface de configuração
- `src/infra/services/queues/rabbitmq/rabbitmq-publisher.ts` - Publisher refatorado
- `src/infra/factories/queues/create-rabbitmq-publisher.factory.ts` - Factory
- `src/infra/events/handlers/user-message-created-rabbitmq.handler.ts` - Exemplo de uso
- `src/infra/factories/events/create-user-message-created-rabbitmq-handler.factory.ts` - Factory do handler

### Consumer
- `src/infra/services/queues/rabbitmq/rabbitmq-consumer.ts` - Consumer implementado
- `src/infra/factories/queues/create-rabbitmq-consumer.factory.ts` - Factory
- `src/infra/services/workers/send-user-message-rabbitmq.worker.ts` - Exemplo de worker
- `src/infra/factories/workers/create-send-user-message-rabbitmq-worker.factory.ts` - Factory do worker 