import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from './generated/prisma/client.js';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });
export default prisma;