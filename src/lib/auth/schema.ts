import { z } from 'zod/v4';

export const authschema = z.object({
	email: z.email(),
	password: z.string().min(8, { error: 'Too short Password.' })
});

export const DOCTOR_TYPES = ['Empty', 'Dentist', 'Optometrist'] as const;

const signupBaseSchema = z.object({
	email: z.email('Please enter a valid email address'),

	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(100, 'Password is too long'),

	confirmPassword: z.string(),
	centerName: z
		.string()
		.min(2, 'Center name is required')
		.max(100, 'Center name is too long')
		.trim(),

	doctorName: z
		.string()
		.min(2, 'Doctor name is required')
		.max(100, 'Doctor name is too long')
		.trim(),

	phoneNumber: z.string().min(1, 'Phone number is required'),
	doctorType: z
		.enum(DOCTOR_TYPES)
		.default('Empty')
		.refine((val) => {
			return val !== 'Empty';
		}, 'Please select either Dentist or Optometrist')
});

export const signupSchema = signupBaseSchema.check((ctx) => {
	if (ctx.value.password !== ctx.value.confirmPassword) {
		ctx.issues.push({
			code: 'custom',
			message: "Passwords don't match",
			path: ['confirmPassword'],
			input: ctx.value
		});
	}
});
