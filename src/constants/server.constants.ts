/**
 * Interface for Swagger tag
 */
interface SwaggerTag {
  name: string;
  description: string;
}

/**
 * Server configuration constants
 */
export const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
  apiPath: 'documentation',
  swaggerConfig: {
    title: 'Kai temporal API',
    description: 'The Kai Agent REST API documentation.',
    version: '1.0',
    tags: [] as SwaggerTag[],
  },
};
