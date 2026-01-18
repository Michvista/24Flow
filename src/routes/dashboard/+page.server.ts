// src/routes/dashboard/+page.server.js
export const load = async ({ locals }) => {
	return {
		user: locals.user
	};
};
