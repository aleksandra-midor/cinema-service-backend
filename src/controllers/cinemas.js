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

module.exports = router;