import type { FastifyReply, FastifyRequest } from 'fastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CaptchaService } from '../../infrastructure/captcha/captcha.service';
import { CaptchaController } from '../../infrastructure/controllers/captcha.controller';

const mockCaptchaService: Partial<CaptchaService> = {
	createCaptcha: vi.fn(),
	getCaptcha: vi.fn(),
	validateCaptcha: vi.fn(),
};

describe('CaptchaController', () => {
	let controller: CaptchaController;
	let mockRequest: Partial<FastifyRequest>;
	let mockReply: Partial<FastifyReply>;

	beforeEach(() => {
		vi.clearAllMocks();
		controller = new CaptchaController(mockCaptchaService as CaptchaService);
		mockRequest = {};
		mockReply = {
			send: vi.fn().mockReturnThis(),
			status: vi.fn().mockReturnThis(),
		};
	});

	it('should create a captcha and send response', async () => {
		(mockCaptchaService.createCaptcha as any).mockReturnValue({
			id: 'test-id',
			data: 'test-data',
		});

		await controller.createCaptcha(
			mockRequest as FastifyRequest,
			mockReply as FastifyReply,
		);

		expect(mockCaptchaService.createCaptcha).toHaveBeenCalled();
		expect(mockReply.send).toHaveBeenCalledWith({
			id: 'test-id',
			data: 'test-data',
		});
	});

	it('should get a captcha by ID and send response', async () => {
		mockRequest = { params: { id: 'test-id' } };
		(mockCaptchaService.getCaptcha as any).mockReturnValue({
			id: 'test-id',
			data: 'test-data',
		});

		await controller.getCaptcha(
			mockRequest as FastifyRequest<{ Params: { id: string } }>,
			mockReply as FastifyReply,
		);

		expect(mockCaptchaService.getCaptcha).toHaveBeenCalledWith('test-id');
		expect(mockReply.send).toHaveBeenCalledWith({
			id: 'test-id',
			data: 'test-data',
		});
	});

	it('should handle "Captcha not found" error in getCaptcha', async () => {
		mockRequest = { params: { id: 'nonexistent-id' } };
		(mockCaptchaService.getCaptcha as any).mockImplementation(() => {
			throw new Error('Captcha not found');
		});

		await controller.getCaptcha(
			mockRequest as FastifyRequest<{ Params: { id: string } }>,
			mockReply as FastifyReply,
		);

		expect(mockCaptchaService.getCaptcha).toHaveBeenCalledWith(
			'nonexistent-id',
		);
		expect(mockReply.status).toHaveBeenCalledWith(404);
		expect(mockReply.send).toHaveBeenCalledWith({
			message: 'Captcha not found',
		});
	});

	it('should handle general error in getCaptcha', async () => {
		mockRequest = { params: { id: 'nonexistent-id' } };
		(mockCaptchaService.getCaptcha as any).mockImplementation(() => {
			throw new Error('Internal Server Error');
		});

		await controller.getCaptcha(
			mockRequest as FastifyRequest<{ Params: { id: string } }>,
			mockReply as FastifyReply,
		);
		expect(mockCaptchaService.getCaptcha).toHaveBeenCalledWith(
			'nonexistent-id',
		);
		expect(mockReply.status).toHaveBeenCalledWith(500);
		expect(mockReply.send).toHaveBeenCalledWith({
			message: 'Internal Server Error',
		});
	});

	it('should validate a captcha and send response', async () => {
		mockRequest = { body: { id: 'test-id', value: 'test-value' } };
		(mockCaptchaService.validateCaptcha as any).mockReturnValue(true);

		await controller.validateCaptcha(
			mockRequest as FastifyRequest<{ Body: { id: string; value: string } }>,
			mockReply as FastifyReply,
		);

		expect(mockCaptchaService.validateCaptcha).toHaveBeenCalledWith(
			'test-id',
			'test-value',
		);
		expect(mockReply.send).toHaveBeenCalledWith({ valid: true });
	});

	it('should handle "Captcha not found" error in validateCaptcha', async () => {
		mockRequest = { body: { id: 'test-id', value: 'test-value' } };
		(mockCaptchaService.validateCaptcha as any).mockImplementation(() => {
			throw new Error('Captcha not found');
		});
		await controller.validateCaptcha(
			mockRequest as FastifyRequest<{ Body: { id: string; value: string } }>,
			mockReply as FastifyReply,
		);
		expect(mockReply.status).toHaveBeenCalledWith(404);
		expect(mockReply.send).toHaveBeenCalledWith({
			message: 'Captcha not found',
		});
	});

	it('should handle general error in validateCaptcha', async () => {
		mockRequest = { body: { id: 'test-id', value: 'test-value' } };
		(mockCaptchaService.validateCaptcha as any).mockImplementation(() => {
			throw new Error('Internal Server Error');
		});

		await controller.validateCaptcha(
			mockRequest as FastifyRequest<{ Body: { id: string; value: string } }>,
			mockReply as FastifyReply,
		);
		expect(mockReply.status).toHaveBeenCalledWith(500);
		expect(mockReply.send).toHaveBeenCalledWith({
			message: 'Internal Server Error',
		});
	});
});
