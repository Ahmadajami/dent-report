import type { CookieSerializeOptions } from 'cookie';

export class AppConstants {
	// --- API Endpoints ---
	/**
	 * @constant {string} BASE_API_URL
	 * @description The base URL for all API requests.
	 */
	public static readonly BASE_API_URL: string = 'https://dummyjson.com';

	// --- Auth Endpoints ---
	/**
	 * @constant {string[]} AUTH_ENDPOINTS
	 * @description List of authentication endpoints that should not have auth headers.
	 */
	public static readonly AUTH_ENDPOINTS: readonly string[] = ['/login', '/signup', '/refresh'];

	// --- Auth Setting ---
	/**
	 * @constant {string} COOKIES_AUTH
	 * @description Auth Cookies Key.
	 */
	public static readonly COOKIES_AUTH: string = 'AuthorizationToken';

	/**
	 * @constant {string} COOKIES_REFRESH
	 * @description Refresh Token Cookies Key.
	 */
	public static readonly COOKIES_REFRESH: string = 'AuthorizationRefreshToken';

	/**
	 * @constant {object} COOKIES_OPTIONS
	 * @description Options for setting auth cookies.
	 */
	public static readonly COOKIES_OPTIONS: CookieSerializeOptions & { path: string } = {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24, // 1 day in seconds
		//secure: process.env.NODE_ENV === 'production' // Only secure in production
	};

	/**
	 * @constant {object} REFRESH_COOKIES_OPTIONS
	 * @description Options for setting refresh token cookies (longer expiration).
	 */
	public static readonly REFRESH_COOKIES_OPTIONS: CookieSerializeOptions & { path: string } = {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
		//secure: process.env.NODE_ENV === 'production' // Only secure in production
	};

	/**
	 * @constant {object} COOKIES_DELETE_OPTIONS
	 * @description Options for deleting cookies - must match the key properties used when setting.
	 */
	public static readonly COOKIES_DELETE_OPTIONS: Pick<CookieSerializeOptions, 'path' | 'httpOnly' | 'sameSite'> & { path: string } = {
		httpOnly: true,
		path: '/',
		sameSite: 'strict'
	};
}