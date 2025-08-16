export enum WhatsAppIntegrations {
  OFFICIAL = 'official'
};

const getActiveWhatsAppIntegration = (): WhatsAppIntegrations => {
  const type = process.env.WHATSAPP_INTEGRATION as WhatsAppIntegrations;

  if (!Object.values(WhatsAppIntegrations).includes(type)) {
    throw new Error(`Invalid integration type: ${type}`);
  }

  return type;
};

export const WHATSAPP_INTEGRATION = getActiveWhatsAppIntegration();