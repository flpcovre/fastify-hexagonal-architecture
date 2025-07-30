import { PrismaClient } from '@prisma/client';

export async function flowSeeder(prisma: PrismaClient) {
  await prisma.flowOption.deleteMany();
  await prisma.flow.deleteMany();

  const startFlow = await prisma.flow.create({
    data: {
      id: 'start',
      message: 'Olá! Como podemos te ajudar?',
      isTerminal: false,
    },
  });

  const orderFlow = await prisma.flow.create({
    data: {
      id: 'orders',
      message: 'Dúvidas comuns sobre Pedidos.',
      isTerminal: false,
    },
  });

  const refundFlow = await prisma.flow.create({
    data: {
      id: 'refund',
      message: 'Dúvidas comuns sobre Reembolso',
      isTerminal: false,
    },
  });

  const toSupportFlow = await prisma.flow.create({
    data: {
      id: 'support',
      message: 'Estamos te encaminhando para um atendente.',
      isTerminal: true,
    },
  });

  const orderTimeFlow = await prisma.flow.create({
    data: {
      id: 'order-time',
      message: 'A mercadoria será enviada após 3 dias utéis após o pedido, e tem o prazo de 7 dias após a postagem para chegar em sua residência.',
      isTerminal: true,
    },
  });

  const outItemFlow = await prisma.flow.create({
    data: {
      id: 'out-item',
      message: 'Você não pode encomendar um item que esgotou em nosso estoque, mas recomendamos em se inscrever na página do produto com o seu e-mail, para receber as ultimas atualizações sobre o pedido',
      isTerminal: true,
    },
  });

  const orderTrackFlow = await prisma.flow.create({
    data: {
      id: 'order-track',
      message: 'Você pode acompanhar o rastreamento do pedido no site dos correios, em rastreamento.correios.com.br',
      isTerminal: true,
    },
  });

  const refundRequestFlow = await prisma.flow.create({
    data: {
      id: 'refund-request',
      message: 'Você pode solicitar o reembolso do pedido, na página do item em nosso Site, clicando em "Quero Solicitar o Reembolso do Produto"',
      isTerminal: true,
    },
  });

  const refundDeadlineFlow = await prisma.flow.create({
    data: {
      id: 'refund-deadline',
      message: 'O prazo para solicitar o reembolso é de 7 dias úteis após a entrega do produto.',
      isTerminal: true,
    },
  });

  const refundNotMadeFlow = await prisma.flow.create({
    data: {
      id: 'refund-not-made',
      message: 'Se o reembolso do pedido não for efetuado corretamente, favor entrar em contato com nosso Suporte.',
      isTerminal: true,
    },
  });

  const startFlowOption1 = await prisma.flowOption.create({
    data: {
      flowId: startFlow.id,
      text: 'Quero saber mais sobre meus pedidos',
      nextFlowId: orderFlow.id,
    },
  });

  const starFlowOption2 = await prisma.flowOption.create({
    data: {
      flowId: startFlow.id,
      text: 'Quero saber mais sobre reembolsos',
      nextFlowId: refundFlow.id,
    },
  });

  const startFlowOption3 = await prisma.flowOption.create({
    data: {
      flowId: startFlow.id,
      text: 'Quero falar com um atendente',
      nextFlowId: toSupportFlow.id,
    },
  });

  const orderFlowOption1 = await prisma.flowOption.create({
    data: {
      flowId: orderFlow.id,
      text: 'Em quanto tempo recebo meu pedido?',
      nextFlowId: orderTimeFlow.id,
    },
  });

  const orderFlowOption2 = await prisma.flowOption.create({
    data: {
      flowId: orderFlow.id,
      text: 'Posso encomendar um item que está esgotado?',
      nextFlowId: outItemFlow.id,
    },
  });

  const orderFlowOption3 = await prisma.flowOption.create({
    data: {
      flowId: orderFlow.id,
      text: 'Como faço para rastrear meu pedido?',
      nextFlowId: orderTrackFlow.id,
    },
  });

  const refundFlowOption1 = await prisma.flowOption.create({
    data: {
      flowId: refundFlow.id,
      text: 'Como solicitar o reembolso?',
      nextFlowId: refundRequestFlow.id,
    },
  });

  const refundFlowOption2 = await prisma.flowOption.create({
    data: {
      flowId: refundFlow.id,
      text: 'Qual o prazo para reembolso?',
      nextFlowId: refundDeadlineFlow.id,
    },
  });

  const refundFlowOption3 = await prisma.flowOption.create({
    data: {
      flowId: refundFlow.id,
      text: 'O que fazer se o reembolso não foi efetuado?',
      nextFlowId: refundNotMadeFlow.id,
    },
  });
}