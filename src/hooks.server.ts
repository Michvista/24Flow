import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const response = await resolve(event);

	if (response.status === 404 && !event.url.pathname.startsWith('/404')) {
		throw redirect(307, '/404');
	}

	return response;
}
