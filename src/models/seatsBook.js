const mongoose = require('mongoose');

const SeatsBookSchema = new mongoose.Schema ({
  date:{ type: String, required: true },
  hour:{ type: String, required: true },
  movieId:{ type: String, required: true },
  bookedSeats:{type:[Number], required: true},
  cinemaId:{ type: String, required: true },
})

module.exports =  mongoose.model('SeatsBook', SeatsBookSchema);
