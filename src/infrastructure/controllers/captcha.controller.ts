import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CaptchaService } from '../captcha/captcha.service';

export class CaptchaController {
	constructor(private captchaService: CaptchaService) {}

	async createCaptcha(req: FastifyRequest, reply: FastifyReply) {
		try {
			const captcha = await this.captchaService.createCaptcha();
			return reply.send(captcha);
		} catch (error) {
			reply.status(500).send({ message: 'Internal Server Error' });
		}
	}

	async getCaptcha(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			const { id } = req.params;
			const captcha = await this.captchaService.getCaptcha(id);
			return reply.send(captcha);
		} catch (error) {
			if (error instanceof Error && error.message === 'Captcha not found') {
				reply.status(404).send({ message: 'Captcha not found' });
			} else {
				reply.status(500).send({ message: 'Internal Server Error' });
			}
		}
	}

	async validateCaptcha(
		req: FastifyRequest<{ Body: { id: string; value: string } }>,
		reply: FastifyReply,
	) {
		try {
			const { id, value } = req.body;
			const isValid = await this.captchaService.validateCaptcha(id, value);
			return reply.send({ valid: isValid });
		} catch (error) {
			if (error instanceof Error && error.message === 'Captcha not found') {
				reply.status(404).send({ message: 'Captcha not found' });
			} else {
				reply.status(500).send({ message: 'Internal Server Error' });
			}
		}
	}
}
