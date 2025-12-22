import { error } from '@sveltejs/kit';

export function load() {
    error(401, 'User not authorized to view this page');
}
