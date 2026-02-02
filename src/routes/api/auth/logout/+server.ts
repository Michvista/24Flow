import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	// Clear the cookie on the frontend domain
	cookies.delete('accessToken', { path: '/' });

	return json({ status: true, message: 'Logged out successfully' });
};
