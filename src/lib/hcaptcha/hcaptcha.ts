import { HCAPTCHA_SECRETKEY } from '$env/static/private';

export interface HCaptchaVerifyResponse {
	success: boolean;
	challenge_ts?: string; // timestamp of the challenge (ISO format)
	hostname?: string; // hostname where challenge was passed
	credit?: boolean; // deprecated field
	'error-codes'?: string[]; // array of error codes if success is false
	score?: number; // ENTERPRISE: score denoting malicious activity
	score_reason?: string[]; // ENTERPRISE: reasons for score
}

export async function verifyHCaptcha(
	token: string,
	remoteip?: string,
	sitekey?: string
): Promise<{ success: boolean; data: HCaptchaVerifyResponse; error?: string }> {
	try {
		// Use the correct API endpoint from official docs
		const response = await fetch('https://api.hcaptcha.com/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				secret: HCAPTCHA_SECRETKEY,
				response: token,
				...(remoteip && { remoteip }),
				...(sitekey && { sitekey }) // recommended for security
			})
		});

		if (!response.ok) {
			return {
				success: false,
				data: { success: false, 'error-codes': ['bad-request'] },
				error: `HTTP ${response.status}: ${response.statusText}`
			};
		}

		const data: HCaptchaVerifyResponse = await response.json();

		// Log detailed error information for debugging
		if (!data.success && data['error-codes']) {
			console.error('hCaptcha verification failed:', data['error-codes']);
		}

		return {
			success: data.success,
			data,
			error: data['error-codes']?.join(', ')
		};
	} catch (error) {
		console.error('hCaptcha verification error:', error);
		return {
			success: false,
			data: { success: false, 'error-codes': ['network-error'] },
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}
