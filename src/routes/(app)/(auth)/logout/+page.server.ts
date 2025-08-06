import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { AppConstants } from '$lib';
import { localizeHref } from '$lib/paraglide/runtime';

export const load: PageServerLoad = async () => {
	redirect(302, localizeHref('/'));
};
export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		locals.user = undefined;
		cookies.set(AppConstants.COOKIES_AUTH, '', {
			path: '/',
			expires: new Date(0)
		});
	}
};
