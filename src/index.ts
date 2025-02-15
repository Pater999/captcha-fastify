import cors from '@fastify/cors';
import Fastify, { type FastifyInstance } from 'fastify';
import { configs } from './config';
import type { ICaptchaRepository } from './core/captcha/captcha.repository.interface';
import { InMemoryCaptchaRepository } from './infrastructure/captcha/captcha.repository';
import { CaptchaService } from './infrastructure/captcha/captcha.service';
import { CaptchaController } from './infrastructure/controllers/captcha.controller';
import routes from './routes';

const fastify: FastifyInstance = Fastify({ logger: true });

const captchaRepository: ICaptchaRepository = new InMemoryCaptchaRepository();
const captchaService = new CaptchaService(captchaRepository, {
	size: configs.CAPTCHA_OPTIONS.SIZE,
	noise: configs.CAPTCHA_OPTIONS.NOISE,
});

const captchaController = new CaptchaController(captchaService);

fastify.register(routes, { controller: captchaController });

fastify.register(cors, {});

fastify.get('/health', async (request, reply) => {
	reply.send('Okay!');
});

// --- Server Start ---
const start = async () => {
	try {
		await fastify.listen({ port: configs.PORT });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
