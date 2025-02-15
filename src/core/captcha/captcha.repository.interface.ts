import type { Captcha } from '../types';

export interface ICaptchaRepository {
	save(captcha: Captcha): Promise<void>;
	get(id: string): Promise<Captcha | null>;
	delete(id: string): Promise<void>;
}
