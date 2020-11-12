const express = require('express');
const cors = require('cors');
require('dotenv/config');

const app = express();
// const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

const movies = require('./controllers/movies');
const cinemas = require('./controllers/cinemas');
const payment = require('./controllers/payment');
const bookedSeats = require('./controllers/bookedSeats');

app.use('/api/v1/movies', movies);
app.use('/api/v1/cinemas', cinemas);
app.use('/api/v1/payment', payment);
app.use('/api/v1/bookedSeats', bookedSeats);

module.exports = app;
