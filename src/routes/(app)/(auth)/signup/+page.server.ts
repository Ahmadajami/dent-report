import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { clinicSchema, medicalSchema } from '$lib/auth/gpt-schema';

export const load: PageServerLoad = async () => {
	// Different schemas, no id required according to the docs
	const clinicForm = await superValidate(zod4(clinicSchema));
	const medicalForm = await superValidate(zod4(medicalSchema));

	// Return both forms
	return { clinicForm, medicalForm };
};

export const actions: Actions = {
	clinicAccount: async ({ request }) => {
		const clinicForm = await superValidate(request, zod4(clinicSchema));

		if (!clinicForm.valid) {
			return fail(400, { clinicForm });
		}

		// TODO: Update account in database
		console.log('Clinic Accoutn :', clinicForm.data);

		return message(clinicForm, 'Account updated successfully!');
	},

	medicalAccount: async ({ request }) => {
		const medicalForm = await superValidate(request, zod4(medicalSchema));

		if (!medicalForm.valid) {
			return fail(400, { medicalForm });
		}
		console.log('Medical Account :', medicalForm.data);
	}
};
