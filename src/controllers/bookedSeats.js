/* eslint-disable object-curly-newline */
const express = require('express');
const BookedSeat = require('../models/bookedSeat');

const router = express.Router();

// get all tickets by id (matching the requirements)

router.get('/:cinema/:movie/:date/:hour', async (req, res) => {
  console.log(req.params);
  const { cinema, movie, date, hour } = req.params;
  try {
    const booking = await BookedSeat.findOne({
      cinemaId: cinema,
      movieId: movie,
      date,
      hour: hour.replace('_', ':'),
    });

    if (booking) {
      console.log('===============', booking);
      return res.json(booking.bookedSeats);
    }
    return res.json([]);
  } catch (error) {
    res.status(500).send();
  }
  return undefined;
});

module.exports = router;
