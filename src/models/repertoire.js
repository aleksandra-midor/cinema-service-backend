const mongoose = require('mongoose');

const RepertoireSchema = new mongoose.Schema([
  {
    movieId: { type: String, required: false },
    movieTitle: { type: String, required: false },
    seance: { type: [[String]], required: false },
  },
]);

module.exports = {
  Product: mongoose.model('Repertoire', RepertoireSchema),
  RepertoireSchema,
};
