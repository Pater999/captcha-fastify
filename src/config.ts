const { env } = process;

export const configs = {
	PORT: env.PORT ? Number.parseInt(env.PORT) : 3000,
	HOST: env.HOST ?? '0.0.0.0',
	CAPTCHA_OPTIONS: {
		SIZE: 5,
		NOISE: 20,
	},
};
