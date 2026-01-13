import 'dotenv/config'; // Loads variables from .env automatically
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations'
	},
	datasource: {
		// Use the type-safe env() helper provided by Prisma
		url: env('DIRECT_DATABASE_URL')
	}
});
