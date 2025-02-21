import crypto from 'node:crypto';
import svgCaptcha from 'svg-captcha';
import type { ICaptchaRepository } from '../../core/captcha/captcha.repository.interface';

type SvgCaptchaOption = {
	size: number;
	noise: number;
};

export class CaptchaService {
	constructor(
		private captchaRepository: ICaptchaRepository,
		private options?: SvgCaptchaOption,
	) {}

	async createCaptcha() {
		const generatedCaptcha = svgCaptcha.create(this.options);
		const captcha = {
			data: btoa(generatedCaptcha.data),
			text: generatedCaptcha.text,
			id: crypto.randomUUID(),
		};
		await this.captchaRepository.save(captcha);

		return {
			id: captcha.id,
			data: captcha.data,
		};
	}

	async getCaptcha(id: string) {
		const foundedCaptcha = await this.captchaRepository.get(id);
		if (!foundedCaptcha) {
			throw new Error('Captcha not found');
		}

		return {
			id: foundedCaptcha.id,
			data: foundedCaptcha.data,
		};
	}

	async validateCaptcha(id: string, value: string) {
		const foundedCaptcha = await this.captchaRepository.get(id);
		if (!foundedCaptcha) {
			throw new Error('Captcha not found');
		}

		const isValid = value === foundedCaptcha.text;
		if (isValid) {
			this.captchaRepository.delete(id);
		}
		return isValid;
	}
}
