import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import route from './routes/router.mjs';
import passport from './passport-config.mjs';

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize passport (configured in passport-config.mjs)
app.use(passport.initialize());

app.use('/', route);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
