import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages';

// Define the enum for specialization as requested.
export const SPECIALIZATION_TYPES = [
	'Empty',
	'General Dentist',
	'Orthodontist',
	'Periodontist',
	'Prosthodontist',
	'Endodontist',
	'Oral Surgeon',
	'Pediatric Dentist',
	'Other'
] as const;

// Use the constant array to define the Zod enum and its validation.
const SpecializationEnum = z
	.enum(SPECIALIZATION_TYPES)
	.default('Empty')
	.refine((val) => {
		return val !== 'Empty';
	}, m.specialization_wrong());

export const clinicSchema = z
	.object({
		phoneNumber: z
			.string()
			.min(10, 'Phone number must be at least 10 characters long')
			.max(16, 'Phone number must not exceed 15 characters')
			.regex(
				/^\+963[\d\s]+$/,
				'Phone number must start with +963 and contain only digits and spaces after it'
			),
		fullname_ar: z.string().min(1, 'Arabic full name is required'),
		fullnamenglish: z.string().min(1, 'English full name is required'),
		clinicName: z.string().min(1, 'Clinic name is required'),
		specialization: SpecializationEnum,
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(100, 'Password must not exceed 100 characters'),
		confirmPassword: z.string()
	})
	.check((ctx) => {
		if (ctx.value.password !== ctx.value.confirmPassword) {
			ctx.issues.push({
				code: 'custom',
				message: m.confirm_password_error(),
				path: ['confirmPassword'],
				input: ctx.value
			});
		}
	});
