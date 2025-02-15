import type { Knex } from 'knex';
import type { ICaptchaRepository } from '../../core/captcha/captcha.repository.interface';
import type { Captcha } from '../../core/types';

export class PostgresCaptchaRepository implements ICaptchaRepository {
	constructor(private sqlClient: Knex) {}

	async save(captcha: Captcha): Promise<void> {
		await this.sqlClient('captchas').insert(captcha);
	}

	async get(id: string): Promise<Captcha | null> {
		const captcha = await this.sqlClient<Captcha>('captchas')
			.where('id', id)
			.first();
		return captcha ?? null;
	}

	async delete(id: string): Promise<void> {
		await this.sqlClient<Captcha>('captchas').where('id', id).del();
	}
}
