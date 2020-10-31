const express = require('express');
const Cinema = require('../models/cinema');

const router = express.Router();

//get all cinemas
router.get('/', async (req, res) => {
  try {
    const allCinemas = await Cinema.find();
    return res.json(allCinemas)
  } catch (err) {
    return res.status(500).send();
  }
});

//get single cinema by id
router.get('/:cinemaId', async (req,res) => {
  try {
    const foundCinema = await Cinema.findById(req.params.cinemaId);
    res.json(foundCinema);
  } catch (error) {
    res.json({ message: error});
  }
});

module.exports = router;