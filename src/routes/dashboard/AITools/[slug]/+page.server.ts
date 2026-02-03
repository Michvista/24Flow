import { error } from '@sveltejs/kit';
import { posts } from '../data.js';

export function load({ params, cookies }) {
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) error(404);

	const token = cookies.get('accessToken');

	return {
		post,
		token: token || ''
	};
}
