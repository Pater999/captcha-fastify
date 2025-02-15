const { env } = process;

export const configs = {
	PORT: env.PORT ? Number.parseInt(env.PORT) : 3000,
	HOST: env.HOST ?? '0.0.0.0',
	CAPTCHA_OPTIONS: {
		SIZE: 5,
		NOISE: 20,
	},
	DATABASE: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			port: Number.parseInt(process.env.DB_PORT || '5432', 10),
			user: process.env.DB_USER || 'postgres',
			password: process.env.DB_PASSWORD || 'postgres',
			database: process.env.DB_NAME || 'captcha_db',
		},
		useNullAsDefault: true,
	},
	LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
