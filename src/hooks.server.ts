import { redirect } from '@sveltejs/kit';
	import { PUBLIC_API_URL } from '$env/static/public';


export async function handle({ event, resolve }) {
	const token = event.cookies.get('accessToken');

	if (token) {
		try {
			const res = await fetch(`${PUBLIC_API_URL}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Cookie: `accessToken=${token}`
				}
			});

			if (!res.ok) {
				const errorBody = await res.text();
				console.log(`Backend rejected token. Status: ${res.status}, Body: ${errorBody}`);
			}

			if (res.ok) {
				const result = await res.json();
				event.locals.user = result.data;
			} else {
				event.locals.user = null;
			}
		} catch (err) {
			console.error('Auth hook error:', err);
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}
	

	const isProtectedRoute = event.url.pathname.startsWith('/dashboard');

	if (isProtectedRoute && !event.locals.user) {
		throw redirect(307, '/401');
	}

	const isAuthPage = event.url.pathname === '/auth';
	const err = event.url.pathname === '/401';

	if ( event.locals.user && isAuthPage && !err) {
		throw redirect(303, '/dashboard');
		console.log('Redirecting authenticated user from /auth to /dashboard');
	}

	const response = await resolve(event);

	if (response.status === 404 && !event.url.pathname.startsWith('/404')) {
		throw redirect(307, '/404');
	}

	if (response.status === 401 && !event.url.pathname.startsWith('/401')) {
		throw redirect(307, '/401');
	}

	return response;
}
