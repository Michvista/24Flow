import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Handle 404 Not Found
	if (response.status === 404 && !event.url.pathname.startsWith('/404')) {
		throw redirect(307, '/404');
	}

	// Handle 401 Unauthorized
	if (response.status === 401 && !event.url.pathname.startsWith('/401')) {
		throw redirect(307, '/401');
	}

	return response;
}
