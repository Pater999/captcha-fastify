const { env } = process;

export const configs = {
	PORT: env.PORT ? Number.parseInt(env.PORT) : 3000,
	CAPTCHA_OPTIONS: {
		SIZE: 5,
		NOISE: 20,
	},
};
