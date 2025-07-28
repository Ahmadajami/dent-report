import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import type { UserModel } from '$lib/auth/auth';
import { AppConstants } from '$lib';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		const dir = locale === 'ar' ? 'rtl' : 'ltr';
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('%paraglide.lang%', locale).replace('%dir%', dir)
		});
	});

const Authhandle: Handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get(AppConstants.COOKIES_AUTH);

	if (authCookie) {
		console.log('user is authinticated');
		try {
			const user = await fetch(`${AppConstants.BASE_API_URL}/auth/me`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${authCookie}`
				},
				credentials: 'include'
			});

			if (!user) {
				throw new Error('User not found');
			}

			const sessionUser = (await user.json()) as UserModel;

			event.locals.user = sessionUser;
		} catch (error) {
			console.error(error);
		}
	}
	if (!authCookie) console.log('user is not  authinticated');

	return await resolve(event);
};

export const handle: Handle = sequence(Authhandle, handleParaglide);
