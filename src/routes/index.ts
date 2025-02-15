import type { FastifyInstance } from 'fastify';
import type { CaptchaController } from '../infrastructure/controllers/captcha.controller';
import {
	createCaptchaSchema,
	getCaptchaSchema,
	validateCaptchaSchema,
} from './schemas/captcha.schemas';

export default async function routes(
	fastify: FastifyInstance,
	options: { controller: CaptchaController },
) {
	const { controller } = options;

	fastify.get('/captcha', { schema: createCaptchaSchema }, async (req, res) =>
		controller.createCaptcha(req, res),
	);

	fastify.get<{ Params: { id: string } }>(
		'/captcha/:id',
		{ schema: getCaptchaSchema },
		async (req, res) => controller.getCaptcha(req, res),
	);
	fastify.post<{ Body: { id: string; value: string } }>(
		'/captcha/validate',
		{ schema: validateCaptchaSchema },
		async (req, res) => controller.validateCaptcha(req, res),
	);
}
