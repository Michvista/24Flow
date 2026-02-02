import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();

	// Forward the request to the backend
	const response = await fetch(`${PUBLIC_API_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	const result = await response.json();

	// If login was successful, extract the token from the backend response
	// and set it as a cookie on the SvelteKit domain
	if (response.ok && result.data) {
		// The backend also returns the token in the response body for this purpose
		const setCookieHeader = response.headers.get('set-cookie');

		// Parse the accessToken from the set-cookie header if present
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
