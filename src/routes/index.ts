import type { FastifyInstance } from 'fastify';
import type { CaptchaController } from '../infrastructure/controllers/captcha.controller';

const validateCaptchaSchema = {
	body: {
		type: 'object',
		properties: {
			id: { type: 'string' },
			value: { type: 'string' },
		},
		required: ['id', 'value'],
	},
};

export default async function routes(
	fastify: FastifyInstance,
	options: { controller: CaptchaController },
) {
	const { controller } = options;

	fastify.get('/captcha', async (req, res) =>
		controller.createCaptcha(req, res),
	);
	fastify.get<{ Params: { id: string } }>('/captcha/:id', async (req, res) =>
		controller.getCaptcha(req, res),
	);
	fastify.post<{ Body: { id: string; value: string } }>(
		'/captcha/validate',
		{ schema: validateCaptchaSchema },
		async (req, res) => controller.validateCaptcha(req, res),
	);
}
