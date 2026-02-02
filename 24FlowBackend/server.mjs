import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

import bodyParser from 'body-parser';
import route from './routes/router.mjs';
import passport from './passport-config.mjs';

import cookieParser from 'cookie-parser';

import { initCron } from './services/cronService.mjs';

const app = express();

app.set('trust proxy', 1);

app.use(cookieParser());
app.use(
	cors({
		origin: [FRONTEND_URL, 'http://localhost:5173'],
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT']
	})
);

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

// Initialize passport (configured in passport-config.mjs)
app.use(passport.initialize());
initCron();

app.use('/', route);

console.log('ENV CHECK', {
	nodeEnv: process.env.NODE_ENV,
	hasJwt: !!process.env.ACCESS_TOKEN_SECRET,
	hasDb: !!process.env.DATABASE_URL
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
