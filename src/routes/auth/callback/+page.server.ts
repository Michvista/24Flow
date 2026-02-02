import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (token) {
		// Store the token as a cookie on the frontend domain
		cookies.set('accessToken', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 7 * 24 * 60 * 60 // 7 days
		});

		// Redirect to dashboard
		throw redirect(303, '/dashboard');
	}

	// If no token, redirect to auth page
	throw redirect(303, '/auth');
};
