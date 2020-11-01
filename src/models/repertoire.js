const mongoose = require('mongoose');

const RepertoireSchema = new mongoose.Schema([
  { 
    movieId: { type: String, required: false }, 
  movieTitle: { type: String, required: false }, 
  monday: { type: String, required: false },
  tuesday: { type: String, required: false },
  3: { type: String, required: false },
  4: { type: String, required: false },
  5: { type: String, required: false },
  6: { type: String, required: false },
  7: { type: String, required: false },
  }
]);

module.exports = {
  Product: mongoose.model('Repertoire', RepertoireSchema),
  RepertoireSchema,
};