import type { ICaptchaRepository } from '../../core/captcha/captcha.repository.interface';
import type { Captcha } from '../../core/types';

export class InMemoryCaptchaRepository implements ICaptchaRepository {
	private captchas: Captcha[] = [];

	save(captcha: Captcha): void {
		this.captchas.push(captcha);
	}

	get(id: string): Captcha | undefined {
		return this.captchas.find((c) => c.id === id);
	}

	delete(id: string): void {
		this.captchas = this.captchas.filter((c) => c.id !== id);
	}
}
