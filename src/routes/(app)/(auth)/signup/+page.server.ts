import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { loginUser, type UserModel } from '$lib/auth/auth';
import { message, superValidate, type ErrorStatus } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { signupSchema } from '$lib/auth/schema';
import { localizeHref } from '$lib/paraglide/runtime';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(302, localizeHref('/gg'));
	}
	return {
		form: await superValidate(zod4(signupSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod4(signupSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const res = await loginUser(form.data.email, form.data.password, fetch);

			if (!res.ok) {
				if (res.status === 401 || res.status === 403) {
					return message(form, 'Invalid email or password.', {
						status: res.status
					});
				}

				return message(form, 'Unexpected error during login. Please try again later.', {
					status: res.status as ErrorStatus
				});
			}

			const data = await res.json();
			const user = data as UserModel;

			if (!user?.accessToken) {
				return message(
					form,
					'Login succeeded but no access token received. Please contact support.',
					{
						status: 500
					}
				);
			}
		} catch (err) {
			console.error('Login error (possible offline):', err);
			return message(form, 'Network error. Please check your internet connection and try again.', {
				status: 503
			});
		}

		redirect(302, localizeHref('/login'));
	}
};
