export const load = async ({ locals, cookies }) => {
	const token = cookies.get('accessToken');
	return {
		user: locals.user,
		token: token || ''
	};
};
