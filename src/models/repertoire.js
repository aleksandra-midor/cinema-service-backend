const mongoose = require('mongoose');

const RepertoireSchema = new mongoose.Schema({

});

module.exports = {
  Product: mongoose.model('Repertoire', RepertoireSchema),
  ProductSchema,
};