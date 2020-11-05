const express = require('express');
const cors = require('cors');
require('dotenv/config');


const app = express();
// const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

const movies = require('./controllers/movies')
const cinemas = require('./controllers/cinemas')
const postCharge = require('./controllers/postCharge');

app.use('/api/v1/movies', movies);
app.use('/api/v1/cinemas', cinemas);
app.use('/api/v1/stripe', postCharge);

// app.use(express.static(path.join(__dirname, '../build')))

// app.get('*', (_, res) => {
//   res.sendFile(path.resolve(__dirname, '../build/index.html'))
// })

module.exports = app;