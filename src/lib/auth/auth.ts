import { AppConstants } from "$lib";

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
			expiresInMins: 30
		}),
		credentials: 'include'
	});
}
