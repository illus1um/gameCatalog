const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  picture: String,
  nameRU: String,
  nameEN: String,
  descriptionRU: String,
  descriptionEN: String,
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
