import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { loginUser, type UserModel } from '$lib/auth/auth';
import { AppConstants } from '$lib';
import { message, superValidate, type ErrorStatus } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { PUBLIC_HCAPTCHA_SITEKEY } from '$env/static/public';
import { z } from 'zod/v4';
import { verifyHCaptcha } from '$lib/hcaptcha/hcaptcha';

const createschema = z.object({
	email: z.email(),
	password: z.string().min(8, { error: 'Too short Password.' }),
	'h-captcha-response': z.string().min(1, 'Please complete the captcha')
});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(302, '/gg');
	}
	return { form: await superValidate(zod4(createschema)) };
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const form = await superValidate(request, zod4(createschema));
		if (!form.valid) {
			console.log('is not valid');
			console.log(form.data['h-captcha-response']);
			return fail(400, { form });
		}
		console.log('isvalid');
		console.log(form.data['h-captcha-response']);

		const captchaToken = form.data['h-captcha-response'];
		const clientIP =
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			request.headers.get('cf-connecting-ip') ||
			request.headers.get('x-client-ip') ||
			undefined;

		// Include sitekey for additional security as recommended by hCaptcha docs
		const verificationResult = await verifyHCaptcha(
			captchaToken,
			clientIP,
			PUBLIC_HCAPTCHA_SITEKEY
		);

		if (!verificationResult.success) {
			console.error('hCaptcha verification failed:', verificationResult.error);

			// Provide specific error messages based on error codes
			let errorMessage = 'Captcha verification failed. Please try again.';

			if (verificationResult.data['error-codes']?.includes('expired-input-response')) {
				errorMessage = 'Captcha has expired. Please complete the captcha again.';
			} else if (verificationResult.data['error-codes']?.includes('invalid-input-response')) {
				errorMessage = 'Invalid captcha response. Please try again.';
			} else if (verificationResult.data['error-codes']?.includes('already-seen-response')) {
				errorMessage = 'Captcha has already been used. Please complete it again.';
			}
			console.log(errorMessage);

			return fail(400, { form });
		}

		if (verificationResult.data.hostname) {
			console.log('hCaptcha verified for hostname:', verificationResult.data.hostname);
		}

		let accessToken: string | null = null;

		try {
			const res = await loginUser(form.data.email, form.data.password, fetch);

			if (!res.ok) {
				if (res.status === 401 || res.status === 403) {
					return message(form, 'Invalid email or password.', {
						status: res.status
					});
				}

				return message(form, 'Unexpected error during login. Please try again later.', {
					status: res.status as ErrorStatus
				});
			}

			const data = await res.json();
			const user = data as UserModel;

			if (!user?.accessToken) {
				return message(
					form,
					'Login succeeded but no access token received. Please contact support.',
					{
						status: 500
					}
				);
			}

			accessToken = user.accessToken;
		} catch (err) {
			console.error('Login error (possible offline):', err);
			return message(form, 'Network error. Please check your internet connection and try again.', {
				status: 503
			});
		}

		// Set cookie only if everything succeeded
		cookies.set(AppConstants.COOKIES_AUTH, accessToken, {
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24
		});

		redirect(302, '/gg');
	}
};
