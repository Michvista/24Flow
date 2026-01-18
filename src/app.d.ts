// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			//  tell TypeScript that event.locals.user exists
			user: {
				id: string;
				name: string;
				email: string;
				avatar?: string;
				googleId?: string;
				  password?: string;

  events:[];
  tasks:[];
  moods:[];
  sleep:string;
  behavior: [];
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
