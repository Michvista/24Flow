import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();

	// Forward the request to the backend
	const response = await fetch(`${PUBLIC_API_URL}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	const result = await response.json();

	// If registration was successful, extract the token and set cookie
	if (response.ok && result.data) {
		const setCookieHeader = response.headers.get('set-cookie');

		if (setCookieHeader) {
			const tokenMatch = setCookieHeader.match(/accessToken=([^;]+)/);
			if (tokenMatch) {
				cookies.set('accessToken', tokenMatch[1], {
					httpOnly: true,
					secure: true,
					sameSite: 'lax',
					path: '/',
					maxAge: 7 * 24 * 60 * 60 // 7 days
				});
			}
		}
	}

	return json(result, { status: response.status });
};
