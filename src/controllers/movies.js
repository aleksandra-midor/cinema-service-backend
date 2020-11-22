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

// get movies for the given cinema by cinema id
// router.get('/:cinemaId', async (req, res) => {
//   console.log('-------------------------');
//   try {
//     const foundMovies = [];
//     const foundCinema = await Cinema.findById(req.params.cinemaId);
//     foundCinema.repertoire.forEach((movie) => foundMovies.push(movie.movieId));

//     const moviesByCinema = [];

//     for (let i = 0; i < foundMovies.length; i += 1) {
//       const foundMovie = Movie.findOne({
//         movieId: foundMovies[i],
//       });
//       moviesByCinema.push(foundMovie);
//     }

//     //  foundMovies.forEach(async (movie) => {
//     //   const foundMovie = await Movie.findOne({
//     //     movieId: movie,
//     //   });
//     //   console.log(foundMovie);
//     // });

//     console.log(await Promise.all(moviesByCinema));
//     // const
//     return null;
//     // res.json()
//   } catch (err) {
//     return res.status(500).send();
//   }
// });

module.exports = router;
