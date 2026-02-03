export const load = async ({ locals, cookies, params }) => {
	const token = cookies.get('accessToken');
	return {
		user: locals.user,
		token: token || '',
		planId: params.id
	};
};
