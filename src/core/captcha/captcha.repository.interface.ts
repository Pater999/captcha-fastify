import type { Captcha } from '../types';

export interface ICaptchaRepository {
	save(captcha: Captcha): void;
	get(id: string): Captcha | undefined;
	delete(id: string): void;
}
