import { z } from 'zod/v4';

export const authschema = z.object({
	email: z.email(),
	password: z.string().min(8, { error: 'Too short Password.' }),
});
