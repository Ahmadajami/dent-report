import { m } from '$lib/paraglide/messages';
import { z } from 'zod/v4';

export const CENTER_TYPES = ['Empty', 'Clinc', 'Medical Center'] as const;
export const GENDERS = ['Empty', 'Male', 'Female'] as const;
export const SPECIALISTS = ['Empty', 'general', 'dentist', 'optometrist'] as const;

const doctorSchema = z.object({
	doctorName: z.string().min(2, m.doctor_error()).max(100, m.doctor_error_second()).trim(),

	doctorName_ar: z.string().min(2, m.doctor_error()).max(100, m.doctor_error_second()).trim(),

	phoneNumber: z.string().min(1, m.phonenumber_error()),

	gender: z
		.enum(GENDERS, m.gender_error())
		.default('Empty')
		.refine((val) => val !== 'Empty', m.gender_error()),

	specialist: z
		.enum(
			SPECIALISTS,
			'Specialist must be one of the following options: general, dentist, optometrist'
		)
		.default('Empty')
		.refine(
			(val) => val !== 'Empty',
			'Specialist must be one of the following options: general, dentist, optometrist'
		)
});

const signupBaseSchema = z.object({
	email: z.email(m.email_error()),

	password: z.string().min(8, m.password_error()).max(100, m.password_error_second()),

	confirmPassword: z.string(),

	centerType: z
		.enum(CENTER_TYPES)
		.default('Empty')
		.refine((val) => val !== 'Empty', m.doctor_type_error()),

	clinicName: z.string().optional(),
	centerName: z.string().optional(),

	doctors: z.array(doctorSchema, 'doctorsError').default([])
});

// ------------------- checks -------------------

export const signupSchema = signupBaseSchema.check((ctx) => {
	const { password, confirmPassword, centerType, clinicName, centerName, doctors } = ctx.value;

	// Password confirmation
	if (password !== confirmPassword) {
		ctx.issues.push({
			code: 'custom',
			message: m.confirm_password_error(),
			path: ['confirmPassword'],
			input: ctx.value
		});
	}

	// Clinic rules
	if (centerType === 'Clinc') {
		if (!clinicName) {
			ctx.issues.push({
				code: 'custom',
				message: 'Clinic Name is required',
				path: ['clinicName'],
				input: ctx.value
			});
		}
		if (doctors.length < 1) {
			ctx.issues.push({
				code: 'custom',
				message: 'Clinics must have at least one doctor',
				path: ['doctors'],
				input: ctx.value
			});
		}
	}

	// Medical centre rules
	if (centerType === 'Medical Center') {
		if (!centerName) {
			ctx.issues.push({
				code: 'custom',
				message: m.center_error(),
				path: ['centerName'],
				input: ctx.value
			});
		}
		if (doctors.length < 2) {
			ctx.issues.push({
				code: 'custom',
				message: m.center_doctor_count_error(),
				path: ['doctors'],
				input: ctx.value
			});
		}
	}
});




/*


export const signupSchema = signupBaseSchema
	// password confirmation
	.check((ctx) => {
		if (ctx.value.password !== ctx.value.confirmPassword) {
			ctx.issues.push({
				code: 'custom',
				message: m.confirm_password_error(),
				path: ['confirmPassword'],
				input: ctx.value
			});
		}
	})

	// clinic rules
	.check((ctx) => {
		if (ctx.value.centerType === 'Clinc' && !ctx.value.clinicName) {
			ctx.issues.push({
				code: 'custom',
				message: m.center_error(),
				path: ['clinicName'],
				input: ctx.value
			});
		}
	})
	.check((ctx) => {
		if (ctx.value.centerType === 'Clinc' && ctx.value.doctors.length !== 1) {
			ctx.issues.push({
				code: 'custom',
				message: 'Clinics must have at least one doctor',
				path: ['doctors'],
				input: ctx.value
			});
		}
	})

	// medical centre rules
	.check((ctx) => {
		if (ctx.value.centerType === 'Medical Center' && !ctx.value.centerName) {
			ctx.issues.push({
				code: 'custom',
				message: m.center_error(),
				path: ['centerName'],
				input: ctx.value
			});
		}
	})
	.check((ctx) => {
		if (ctx.value.centerType === 'Medical Center' && ctx.value.doctors.length < 2) {
			ctx.issues.push({
				code: 'custom',
				message: m.center_doctor_count_error(),
				path: ['doctors'],
				input: ctx.value
			});
		}
	});


    --
*/
