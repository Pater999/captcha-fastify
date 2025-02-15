import type { FastifySchema } from 'fastify';

export const validateCaptchaSchema: FastifySchema = {
	tags: ['captcha'],
	body: {
		type: 'object',
		properties: {
			id: { type: 'string' },
			value: { type: 'string' },
		},
		required: ['id', 'value'],
	},
	response: {
		200: {
			type: 'object',
			properties: {
				valid: { type: 'boolean' },
			},
		},
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
		500: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export const getCaptchaSchema: FastifySchema = {
	tags: ['captcha'],
	params: {
		type: 'object',
		properties: {
			id: { type: 'string' },
		},
		required: ['id'],
	},
	response: {
		200: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				data: { type: 'string' },
			},
		},
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
		500: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export const createCaptchaSchema: FastifySchema = {
	tags: ['captcha'],
	response: {
		200: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				data: { type: 'string' },
			},
		},
		500: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};
