import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages';

// Define the enum for specialization.
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

// Zod Enum schema for specialization.
const SpecializationEnum = z
	.enum(SPECIALIZATION_TYPES)
	.default('Empty')
	.refine((val) => val !== 'Empty', m.specialization_wrong());
// --- Reusable base schema ---
const personBaseSchema = z.object({
	fullname_ar: z.string().trim().min(2, m.doctor_error()),
	fullnamenglish: z.string().trim().min(2, m.doctor_error()),
	phoneNumber: z
		.string()
		.min(10, m.phonenumber_error())
		.max(16, m.phonenumber_error())
		.regex(/^\+963[\d\s]+$/, m.phonenumber_error()),
	specialization: SpecializationEnum
});

// --- Doctor Schema (only uses base schema) ---
export const doctorSchema = personBaseSchema;

// --- Medical Schema ---
export const medicalSchema = z.object({
	centerName: z.string().trim().min(2, m.center_error()),
	doctors: z
		.array(doctorSchema)
		.min(2, m.center_doctor_count_error())
		.default([
			{
				fullname_ar: '',
				fullnamenglish: '',
				phoneNumber: '',
				specialization: 'Empty'
			},
			{
				fullname_ar: '',
				fullnamenglish: '',
				phoneNumber: '',
				specialization: 'Empty'
			}
		])
});

// --- Clinic Schema ---
export const clinicSchema = personBaseSchema
	.extend({
		clinicName: z.string().trim().min(2, m.center_error()),
		password: z.string().min(8, m.gross_fancy_worm_flop()).max(100, m.password_error_second()),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: m.confirm_password_error(),
		path: ['confirmPassword']
	});

export type ClinicSchema = typeof clinicSchema;

export type MedicalSchema = typeof medicalSchema;
