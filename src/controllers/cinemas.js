const express = require('express');
const Cinema = require('../models/cinema');
const repertoire = require('../models/repertoire');
const dateChanger = require("../utilities/dateChanger");

const router = express.Router();

//get all cinemas
router.get('/', async (req, res) => {
  try {
    const allCinemas = await Cinema.find().lean() // DZIEKI TEMU DOSTAJĘ ZAMIAST OBIEKTU Z INFO Z DB CZYSTY OBIEKT DO EDYCJI W JS
    dateRepertoire(allCinemas)

    return res.json(allCinemas)
  } catch (err) {
    return res.status(500).send();
  }
});

//get single cinema by id
router.get('/:cinemaId', async (req,res) => {
  try {
    const foundCinema = await Cinema.findById(req.params.cinemaId).lean();
    dateRepertoire([foundCinema])

    return res.json(foundCinema);
  } catch (error) {
    return res.json({ message: error});
  }
});

function dateRepertoire (cinemas) {

  cinemas.forEach((cinema) => cinema.repertoire.forEach((movie) => {
    movie.seance = movie.seance.map((el, i) => {
      return {
        hours: el,
        date: dateChanger[i]
      }
    })
  }) )
} 

module.exports = router;