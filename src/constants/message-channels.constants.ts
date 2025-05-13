/**
 * Message channel definition
 */
export enum KaiMessageChannel {
  TELEGRAM = 'TELEGRAM',
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  API = 'API',
  WEBSITE = 'WEBSITE',
}

/**
 * Supported message channels
 */
export const SUPPORTED_MESSAGE_CHANNELS = [
  KaiMessageChannel.TELEGRAM,
  KaiMessageChannel.WHATSAPP,
  KaiMessageChannel.EMAIL,
  KaiMessageChannel.SMS,
  KaiMessageChannel.API,
  KaiMessageChannel.WEBSITE,
];
