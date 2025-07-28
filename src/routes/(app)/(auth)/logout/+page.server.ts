import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { AppConstants } from '$lib';

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	redirect(302, '/');
};
export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		console.log('From Logout');
		locals.user = undefined;
		cookies.set(AppConstants.COOKIES_AUTH, '', {
			path: '/',
			expires: new Date(0)
		});
	}
};
