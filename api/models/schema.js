const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bannerSchema = new Schema({
  name: String,
  description: String,
  image: String,
  watchLink: String
})

module.exports = {bannerSchema}
