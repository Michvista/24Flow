// src/routes/dashboard/calendar/+page.server.js
export const load = async ({ locals }) => {
    return {
        user: locals.user
    };
};
