import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { AppConstants } from '$lib';
import { localizeHref } from '$lib/paraglide/runtime';

export const load: PageServerLoad = async () => {
	redirect(302, localizeHref('/'));
};
function clearAuthCookies(event): void {
	event.cookies.delete(AppConstants.COOKIES_AUTH, AppConstants.COOKIES_DELETE_OPTIONS);
	event.cookies.delete(AppConstants.COOKIES_REFRESH, AppConstants.COOKIES_DELETE_OPTIONS);
}
export const actions: Actions = {
	default: async (event) => {
		event.locals.user = undefined;
		clearAuthCookies(event);
	}
};
