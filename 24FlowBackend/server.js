const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Load config at the very top!
dotenv.config();

const bodyParser = require('body-parser');
const route = require('./routes/router.js');
// Import our configured passport
const passport = require('./passport-config.js');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// This will work now because passport-config exports the right object
app.use(passport.initialize());

app.use('/', route);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
