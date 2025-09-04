import { z } from 'zod/v4';

/* ---------- Shared helpers ---------- */
const phoneRegex = /^[0-9]{8,15}$/;

const SpecializationEnum = z.enum([
	'General Dentist',
	'Orthodontist',
	'Periodontist',
	'Prosthodontist',
	'Endodontist',
	'Oral Surgeon',
	'Pediatric Dentist',
	'Other'
]);

/* ---------- Reusable Doctor Schema ---------- */
export const DoctorSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	fullNameArabic: z.string().min(1, 'Arabic full name is required'),
	phone: z.string().regex(phoneRegex, 'Enter a valid phone number (8–15 digits)'),
	specialization: SpecializationEnum
});

export type Doctor = z.infer<typeof DoctorSchema>;

/* ---------- Step 1: Doctor Info + Passwords ---------- */
export const StepOneSchema = z
	.object({
		fullName: z.string().min(1, 'Full name is required'),
		fullNameArabic: z.string().min(1, 'Arabic full name is required'),
		phone: z.string().regex(phoneRegex, 'Enter a valid phone number (8–15 digits)'),
		specialization: SpecializationEnum,
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string()
	})
	.check((ctx) => {
		if (ctx.value.password !== ctx.value.confirmPassword) {
			ctx.issues.push({
				input: ctx.value,
				path: ['confirmPassword'],
				message: 'Passwords do not match',
				code: 'custom'
			});
		}
	});

export type StepOne = z.infer<typeof StepOneSchema>;

/* ---------- Step 2: Extends Step 1 with Organization Info ---------- */
export const StepTwoSchema = StepOneSchema.extend({
	role: z.enum(['doctor', 'admin']).default('doctor'),
	organizationType: z.enum(['clinic', 'medicalCentre']),
	clinicName: z.string().optional(),
	centreName: z.string().optional(),
	doctors: z.array(DoctorSchema).default([])
}).check((ctx) => {
	// If the user is a doctor, their professional info is required
	if (
		ctx.value.role === 'doctor' &&
		(!ctx.value.fullName ||
			!ctx.value.fullNameArabic ||
			!ctx.value.phone ||
			!ctx.value.specialization)
	) {
		ctx.issues.push({
			input: ctx.value,
			path: ['doctor'],
			message:
				'Your professional info is required (full name, arabic name, phone, specialization).',
			code: 'custom'
		});
	}

	// Validation rules for a 'clinic'
	if (ctx.value.organizationType === 'clinic') {
		if (!ctx.value.clinicName?.trim()) {
			ctx.issues.push({
				input: ctx.value,
				path: ['clinicName'],
				message: 'Clinic name is required.',
				code: 'custom'
			});
		}
		// An admin must add at least one doctor
		if (ctx.value.role === 'admin' && ctx.value.doctors.length < 1) {
			ctx.issues.push({
				input: ctx.value,
				path: ['doctors'],
				message: 'Please add at least one doctor for the clinic.',
				code: 'custom'
			});
		}
	}

	// Validation rules for a 'medicalCentre'
	if (ctx.value.organizationType === 'medicalCentre') {
		if (!ctx.value.centreName?.trim()) {
			ctx.issues.push({
				input: ctx.value,
				path: ['centreName'],
				message: 'Medical centre name is required.',
				code: 'custom'
			});
		}
		// A medical centre must have at least 2 doctors total
		const signingDoctorCount = ctx.value.role === 'doctor' ? 1 : 0;
		const totalDoctors = signingDoctorCount + ctx.value.doctors.length;
		if (totalDoctors < 2) {
			ctx.issues.push({
				input: ctx.value,
				path: ['doctors'],
				message:
					'A medical centre must list at least 2 doctors (including the signing doctor, if applicable).',
				code: 'custom'
			});
		}
	}
});

export type StepTwo = z.infer<typeof StepTwoSchema>;
