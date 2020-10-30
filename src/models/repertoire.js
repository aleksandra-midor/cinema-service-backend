const mongoose = require('mongoose');

const RepertoireSchema = new mongoose.Schema([
  { filmId: { type: String, required: false }, 
  1: { type: String, required: false },
  2: { type: String, required: false },
  3: { type: String, required: false },
  4: { type: String, required: false },
  5: { type: String, required: false },
  6: { type: String, required: false },
  7: { type: String, required: false },
  }
]);

module.exports = {
  Product: mongoose.model('Repertoire', RepertoireSchema),
  ProductSchema,
};