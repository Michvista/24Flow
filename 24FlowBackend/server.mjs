import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import route from './routes/router.mjs';
import passport from './passport-config.mjs';

import cookieParser from 'cookie-parser';

import { initCron } from './services/cronService.mjs';

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT']
}));

// app.use(express.json({ limit: '10mb' })); 
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

// Initialize passport (configured in passport-config.mjs)
app.use(passport.initialize());
initCron(); 


app.use('/', route);


app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
