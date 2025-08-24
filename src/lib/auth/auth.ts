import { AppConstants } from '$lib';

export interface UserModel {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	accessToken: string;
	refreshToken: string;
}

export async function loginUser(
	username: string,
	password: string,
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
) {
	return fetch(`${AppConstants.BASE_API_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: 'emilys',
			password: 'emilyspass',
			expiresInMins: 2
		}),
		credentials: 'include'
	});
}

export async function refreshAuthToken(
	token: string,
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
): Promise<{ newAccessToken: string; newRefreshToken: string } | null> {
	console.log('Access token expired. Attempting to refresh with dummyjson...');

	try {
		const response = await fetch(`${AppConstants.BASE_API_URL}/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				refreshToken: token,
				expiresInMins: 2
			}),
			credentials: 'include'
		});

		const result = await response.json();

		if (response.ok && result.accessToken) {
			console.log('Token refreshed successfully!');

			return {
				newAccessToken: result.accessToken,
				newRefreshToken: result.refreshToken
			};
		} else {
			console.error('Failed to refresh token:', result);
			return null;
		}
	} catch (error) {
		console.error('Network error during token refresh:', error);
		return null;
	}
}
