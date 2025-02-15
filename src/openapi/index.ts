import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';

export async function setupSwagger(fastify: FastifyInstance) {
	await fastify.register(fastifySwagger, {
		swagger: {
			info: {
				title: 'Captcha Service API',
				version: '1.0.0',
				description: 'API for generating and validating captchas',
			},
			host: '127.0.0.1:3000',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [{ name: 'captcha', description: 'Captcha related end-points' }],
		},
	});

	await fastify.register(fastifySwaggerUi, {
		routePrefix: '/documentation',
		uiConfig: {
			docExpansion: 'full',
			deepLinking: false,
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	});

	fastify.log.warn(
		'Currently running in development mode. Swagger documentation is enabled at http://127.0.0.1:3000/documentation',
	);
}
