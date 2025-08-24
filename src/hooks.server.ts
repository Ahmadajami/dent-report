import { type Handle, type HandleFetch } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { refreshAuthToken, type UserModel } from '$lib/auth/auth';
import { AppConstants } from '$lib';

/**
 * Handles internationalization using Paraglide middleware
 */
const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		const dir = locale === 'ar' ? 'rtl' : 'ltr';
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('%paraglide.lang%', locale).replace('%dir%', dir)
		});
	});

/**
 * Clears authentication cookies
 */
function clearAuthCookies(event: Parameters<Handle>[0]['event']): void {
	event.cookies.delete(AppConstants.COOKIES_AUTH, AppConstants.COOKIES_DELETE_OPTIONS);
	event.cookies.delete(AppConstants.COOKIES_REFRESH, AppConstants.COOKIES_DELETE_OPTIONS);
}

/**
 * Verifies user authentication and sets user in locals
 */
async function verifyAndSetUser(
	event: Parameters<Handle>[0]['event'],
	authToken: string
): Promise<boolean> {
	try {
		const response = await event.fetch(`${AppConstants.BASE_API_URL}/auth/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`
			}
		});

		if (response.ok) {
			const sessionUser = (await response.json()) as UserModel;
			event.locals.user = sessionUser;
			return true;
		}

		return false;
	} catch (error) {
		console.error('Auth verification failed:', error);
		return false;
	}
}

/**
 * Handles authentication verification and user session management
 */
const authHandle: Handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get(AppConstants.COOKIES_AUTH);

	if (!authCookie) {
		console.log('User is not authenticated - no auth cookie');
		return resolve(event);
	}

	console.log('User has auth cookie, verifying...');

	const isValid = await verifyAndSetUser(event, authCookie);

	if (!isValid) {
		console.log('Auth verification failed, clearing cookies');
		clearAuthCookies(event);
	}

	return resolve(event);
};

/**
 * Checks if the request URL is an auth endpoint that shouldn't have auth headers
 */
function isAuthEndpoint(url: string): boolean {
	return AppConstants.AUTH_ENDPOINTS.some((endpoint) => url.endsWith(endpoint));
}

/**
 * Checks if the request should have authorization header
 */
function shouldAddAuthHeader(url: string, accessToken: string | undefined): boolean {
	return url.startsWith(AppConstants.BASE_API_URL) && !isAuthEndpoint(url) && !!accessToken;
}

/**
 * Clones request body for retry attempts
 */
async function cloneRequestBody(request: Request): Promise<string | undefined> {
	if (request.method === 'GET' || request.method === 'HEAD') {
		return undefined;
	}

	try {
		return await request.clone().text();
	} catch (error) {
		console.error('Failed to clone request body:', error);
		throw new Error('Request body cloning failed');
	}
}

/**
 * Creates a new request with fresh authorization token
 */
function createRetryRequest(originalRequest: Request, newToken: string, body?: string): Request {
	// Create new headers without the old Authorization header
	const newHeaders = new Headers();

	// Copy all headers except Authorization
	for (const [key, value] of originalRequest.headers.entries()) {
		if (key.toLowerCase() !== 'authorization') {
			newHeaders.set(key, value);
		}
	}

	// Set the fresh Authorization header
	newHeaders.set('Authorization', `Bearer ${newToken}`);

	return new Request(originalRequest.url, {
		method: originalRequest.method,
		headers: newHeaders,
		body,
		credentials: originalRequest.credentials
	});
}

/**
 * Attempts to refresh the access token and retry the request
 */
async function handleTokenRefresh(
	request: Request,
	response: Response,
	event: Parameters<HandleFetch>[0]['event'],
	fetch: Parameters<HandleFetch>[0]['fetch']
): Promise<Response> {
	const refreshToken = event.cookies.get(AppConstants.COOKIES_REFRESH);

	if (!refreshToken) {
		console.error('No refresh token available for token refresh');
		return response;
	}

	console.log('Attempting token refresh...');

	try {
		// Clone request body before refresh attempt
		const requestBody = await cloneRequestBody(request);

		const tokenResult = await refreshAuthToken(refreshToken, event.fetch);

		if (!tokenResult?.newAccessToken) {
			console.error('Token refresh failed - no new token received');
			clearAuthCookies(event);
			return response;
		}

		if (tokenResult?.newRefreshToken) {
			console.log('Refreshed Token refreshed successfully');
			event.cookies.delete(AppConstants.COOKIES_REFRESH, AppConstants.COOKIES_DELETE_OPTIONS);
			event.cookies.set(
				AppConstants.COOKIES_REFRESH,
				tokenResult.newRefreshToken,
				AppConstants.COOKIES_OPTIONS
			);
		}

		console.log('Token refreshed successfully');

		// Update cookies with new token - delete first to avoid conflicts
		event.cookies.delete(AppConstants.COOKIES_AUTH, AppConstants.COOKIES_DELETE_OPTIONS);
		event.cookies.set(
			AppConstants.COOKIES_AUTH,
			tokenResult.newAccessToken,
			AppConstants.COOKIES_OPTIONS
		);

		// Retry the original request with new token
		const retryRequest = createRetryRequest(request, tokenResult.newAccessToken, requestBody);

		return await fetch(retryRequest);
	} catch (error) {
		console.error('Token refresh error:', error);
		clearAuthCookies(event);
		return response;
	}
}

/**
 * Handles fetch requests with automatic token refresh on 401 errors
 */
export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
	const accessToken = event.cookies.get(AppConstants.COOKIES_AUTH);

	// Add Authorization header for API requests (except auth endpoints)
	if (shouldAddAuthHeader(request.url, accessToken)) {
		request.headers.set('Authorization', `Bearer ${accessToken}`);
	}

	const response = await fetch(request);

	// Handle token refresh on 401 errors
	if (response.status === 401 && event.cookies.get(AppConstants.COOKIES_REFRESH)) {
		return handleTokenRefresh(request, response, event, fetch);
	}

	return response;
};

// Export the main handle function with proper sequence
export const handle: Handle = sequence(authHandle, handleParaglide);
