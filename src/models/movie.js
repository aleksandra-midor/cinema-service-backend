const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  genres: [ String ],
  contentRating: { type: String, required: true },
  duration: { type: String, required: true }, // check if this is a string type
  storyline: { type: String, required: true },
  // director: { type: String, required: true },
  actors: [ String ],
  posterUrl: { type: String, required: true },
});

module.exports = mongoose.model('Movie', MovieSchema);