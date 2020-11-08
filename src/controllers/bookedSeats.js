const express = require('express');
// const BookedSeat = require('../models/bookedSeat');


const router = express.Router();

//get all tickets by id (matching the requirements)

router.get('/:cinema/:movie/:date/:hour', async (req, res) => {
  console.log(req.params)
try {
} catch (error) {

}
}
)

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