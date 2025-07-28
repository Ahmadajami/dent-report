// See https://svelte.dev/docs/kit/types#app.d.ts

import type { UserModel } from '$lib/auth/auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: UserModel;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
