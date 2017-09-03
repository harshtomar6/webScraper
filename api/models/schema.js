const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bannerSchema = new Schema({
  name: String,
  description: String,
  image: String,
  watchLink: String
})

let homepageSchema = new Schema({
  name: String,
  description: String,
  image: String,
  watchLink: String,
  meta: Object
})

let allMoviesSchema = new Schema({
  name: String,
  description: String,
  image: String,
  watchLink: String,
  meta: Object
})

module.exports = {bannerSchema, homepageSchema, allMoviesSchema}
