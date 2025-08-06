import { m } from '$lib/paraglide/messages';
import { z } from 'zod/v4';

export const authschema = z.object({
	email: z.email(m.email_error()),
	password: z.string().min(8, m.password_error())
});

export const DOCTOR_TYPES = ['Empty', 'Dentist', 'Optometrist'] as const;

const signupBaseSchema = z.object({
	email: z.email(m.email_error()),

	password: z.string().min(8, m.password_error()).max(100, m.password_error_second()),

	confirmPassword: z.string(),
	centerName: z.string().min(2, m.center_error()).max(100, m.center_error_second()).trim(),

	doctorName: z.string().min(2, m.doctor_error()).max(100, m.doctor_error_second()).trim(),

	phoneNumber: z.string().min(1, m.phonenumber_error()),
	doctorType: z
		.enum(DOCTOR_TYPES)
		.default('Empty')
		.refine((val) => {
			return val !== 'Empty';
		}, m.doctor_type_error())
});

export const signupSchema = signupBaseSchema.check((ctx) => {
	if (ctx.value.password !== ctx.value.confirmPassword) {
		ctx.issues.push({
			code: 'custom',
			message: m.confirm_password_error(),
			path: ['confirmPassword'],
			input: ctx.value
		});
	}
});
