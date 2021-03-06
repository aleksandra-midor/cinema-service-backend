const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  date: { type: String, required: true },
  hour: { type: String, required: true },
  movieId: { type: String, required: true },
  movieTitle: { type: String, required: true },
  seats: { type: [Number], required: true },
  cinemaId: { type: String, required: true },
  cinemaName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  customerEmail: { type: String, required: true },
  paymentId: { type: String, require: true },
  paymentStatus: { type: String, require: true },
  language: { type: String, require: true },
});

module.exports = mongoose.model('Ticket', TicketSchema);
