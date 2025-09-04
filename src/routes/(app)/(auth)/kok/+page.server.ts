import { z } from 'zod/v4';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const accountSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	username: z.string().min(3, 'Username must be at least 3 characters').regex(/^@/, 'Username must start with @')
});

const passwordSchema = z.object({
	currentPassword: z.string().min(1, 'Current password is required'),
	newPassword: z.string().min(8, 'New password must be at least 8 characters')
});

export const load: PageServerLoad = async () => {
	// Different schemas, no id required according to the docs
	const accountForm = await superValidate(zod4(accountSchema));
	const passwordForm = await superValidate(zod4(passwordSchema));

	// Set default values for account form
	accountForm.data.name = 'Pedro Duarte';
	accountForm.data.username = '@peduarte';

	// Return both forms
	return { accountForm, passwordForm };
};

export const actions = {
	updateAccount: async ({ request }) => {
		const accountForm = await superValidate(request, zod4(accountSchema));
		
		if (!accountForm.valid) {
			return fail(400, { accountForm });
		}

		// TODO: Update account in database
		console.log('Account updated:', accountForm.data);
		
		return message(accountForm, 'Account updated successfully!');
	},

	updatePassword: async ({ request }) => {
		const passwordForm = await superValidate(request, zod4(passwordSchema));
		
		if (!passwordForm.valid) {
			return fail(400, { passwordForm });
		}

		// TODO: Validate current password and update to new password
		console.log('Password update requested');
		
		return message(passwordForm, 'Password updated successfully! You will be logged out.');
	}
} satisfies Actions;