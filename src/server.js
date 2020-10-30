const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());

const movies = require('./controllers/movies')
const cinemas = require('./controllers/cinemas')

app.use('/api/v1/movies', movies);
app.use('/api/v1/cinemas', cinemas);

module.exports = app;