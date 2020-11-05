const mongoose = require('mongoose');
const { RepertoireSchema } = require('./repertoire')

const CinemaSchema = new mongoose.Schema({
  name: { type: String, required: true},
  city: { type: String, required: true},
  address: { type: String, required: true},
  email: { type: String, required: true},
  phone: { type: String, required: true},
  ticketPrice: { type: String, required: true},
  repertoire: [RepertoireSchema],
});

module.exports = mongoose.model('Cinema', CinemaSchema);