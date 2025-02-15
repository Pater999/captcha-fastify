import * as svgCaptcha from 'svg-captcha';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ICaptchaRepository } from '../../core/captcha/captcha.repository.interface';
import type { Captcha } from '../../core/types';
import { CaptchaService } from '../../infrastructure/captcha/captcha.service';

const mockCaptchaRepository: ICaptchaRepository = {
	save: vi.fn(),
	get: vi.fn(),
	delete: vi.fn(),
};

vi.mock('svg-captcha');
const mockedSvgCaptcha = vi.mocked(svgCaptcha);

describe('CaptchaService', () => {
	let service: CaptchaService;

	beforeEach(() => {
		vi.clearAllMocks();
		mockedSvgCaptcha.create.mockReturnValue({
			data: 'mocked-svg-data',
			text: 'mocked-text',
		});
		service = new CaptchaService(mockCaptchaRepository);
	});

	it('should create a captcha', async () => {
		const result = await service.createCaptcha();

		expect(mockedSvgCaptcha.create).toHaveBeenCalledTimes(1);
		expect(mockCaptchaRepository.save).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.any(String),
				text: 'mocked-text',
				data: 'bW9ja2VkLXN2Zy1kYXRh',
			}),
		);

		expect(result).toEqual({
			id: expect.any(String),
			data: 'bW9ja2VkLXN2Zy1kYXRh',
		});
	});

	it('should get a captcha by ID', async () => {
		const mockCaptcha: Captcha = {
			id: 'test-id',
			text: 'test-text',
			data: 'test-data',
		};
		(mockCaptchaRepository.get as any).mockReturnValue(mockCaptcha);

		const result = await service.getCaptcha('test-id');

		expect(mockCaptchaRepository.get).toHaveBeenCalledWith('test-id');
		expect(result).toEqual({ id: 'test-id', data: 'test-data' });
	});

	it('should throw an error if captcha is not found (getCaptcha)', async () => {
		(mockCaptchaRepository.get as any).mockReturnValue(undefined);

		await expect(() =>
			service.getCaptcha('nonexistent-id'),
		).rejects.toThrowError('Captcha not found');
	});

	it('should validate a captcha correctly', async () => {
		const mockCaptcha: Captcha = {
			id: 'test-id',
			text: 'test-text',
			data: 'test-data',
		};
		(mockCaptchaRepository.get as any).mockReturnValue(mockCaptcha);

		const isValid = await service.validateCaptcha('test-id', 'test-text');

		expect(mockCaptchaRepository.get).toHaveBeenCalledWith('test-id');
		expect(isValid).toBe(true);
		expect(mockCaptchaRepository.delete).toHaveBeenCalledWith('test-id'); // Check deletion
	});

	it('should return false for invalid captcha value', async () => {
		const mockCaptcha: Captcha = {
			id: 'test-id',
			text: 'test-text',
			data: 'test-data',
		};
		(mockCaptchaRepository.get as any).mockReturnValue(mockCaptcha);

		const isValid = await service.validateCaptcha('test-id', 'wrong-value');

		expect(mockCaptchaRepository.get).toHaveBeenCalledWith('test-id');
		expect(isValid).toBe(false);
		expect(mockCaptchaRepository.delete).not.toHaveBeenCalled(); // Should not delete
	});

	it('should throw an error if captcha is not found (validateCaptcha)', async () => {
		(mockCaptchaRepository.get as any).mockReturnValue(undefined);

		await expect(() =>
			service.validateCaptcha('nonexistent-id', 'some-value'),
		).rejects.toThrowError('Captcha not found');
	});
});
