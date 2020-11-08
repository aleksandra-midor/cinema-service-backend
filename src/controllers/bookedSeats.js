const express = require('express');
const BookedSeat = require('../models/bookedSeat');


const router = express.Router();

//get all tickets by id (matching the requirements)

router.get('/:cinema/:movie/:date/:hour', async (req, res) => {
  console.log(req.params)
  const { cinema, movie, date, hour } = req.params
  try {
    const booking = await BookedSeat.findOne({
        cinemaId: cinema,
        // movieId: movie,
        // date: date,
        // hour: hour.replace("_", ":"),
      })

      if(booking) {
        console.log('===============', booking)
      return res.json({bookedSeats: booking.bookedSeats})
    } else {
      return res.json({bookedSeats: undefined})
    }
  } catch (error) {
    res.status(404).send()
  }
})

    // const unavailableSeats = [];

    // const unavailableSeat = await BookedSeat.findOne({
    //   cinemaId: req.params.cinemaId,
    //   movieId: req.params.movieId,
    //   date: req.params.date,
    //   hour: req.params.hour,
    // })
    // unavailableSeats.push(unavailableSeat)
//   }
// )
module.exports = router;