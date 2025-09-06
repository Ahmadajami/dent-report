
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { clinicSchema } from '$lib/auth/gpt-schema';



export const load: PageServerLoad = async () => {
	// Different schemas, no id required according to the docs
	const clinicForm = await superValidate(zod4(clinicSchema));
	const MedicalForm = await superValidate(zod4(clinicSchema));


	// Return both forms
	return { clinicForm, MedicalForm };
};

export const actions = {
	clinicAccount: async ({ request }) => {
		const clinicForm = await superValidate(request, zod4(clinicSchema));

		if (!clinicForm.valid) {
			return fail(400, { clinicForm });
		}

		// TODO: Update account in database
		console.log('Clinic Accoutn :', clinicForm.data);

		return message(clinicForm, 'Account updated successfully!');
	},

	MedicalAccount: async ({ request }) => {
		const passwordForm = await superValidate(request, zod4(clinicSchema));

		if (!passwordForm.valid) {
			return fail(400, { passwordForm });
		}

		// TODO: Validate current password and update to new password
		console.log('Password update requested');

		return message(passwordForm, 'Password updated successfully! You will be logged out.');
	}
} satisfies Actions;
