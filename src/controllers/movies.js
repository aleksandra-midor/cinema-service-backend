const express = require('express');
const Movie = require('../models/movie');

const router = express.Router();

// get all movies
router.get('/', async (req, res) => {
  console.log('-----------------');
  try {
    const allMovies = await Movie.find();
    return res.json(allMovies);
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
