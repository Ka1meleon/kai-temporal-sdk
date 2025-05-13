/**
 * Message response type definition
 */
export enum MessageFileType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
}

/**
 * Supported response types
 */
export const SUPPORTED_REQUEST_TYPES = [MessageFileType.TEXT, MessageFileType.AUDIO];

/**
 * Message response type definition
 */
export enum MessageResponseType {
  TEXT = 'TEXT',
}

/**
 * Supported response types
 */
export const SUPPORTED_RESPONSE_TYPES = [MessageResponseType.TEXT];
