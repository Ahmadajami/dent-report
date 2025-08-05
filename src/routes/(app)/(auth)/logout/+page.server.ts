import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { AppConstants } from '$lib';

export const load: PageServerLoad = async () => {
	redirect(302, '/');
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
