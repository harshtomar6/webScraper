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
  infoLink: String,
  image: String,
  watchLink: String,
  meta: {
      episode: String,
      imdb: String,
      year: String,
      duration: String,
      quality: String,
      description: String,
      released: String,
      country: String,
      genre: Array
  }
})

let tvSeriesSchema = new Schema({
  name: String,
  infoLink: String,
  image: String,
  watchLink: String,
  meta: {
      episode: String,
      imdb: String,
      year: String,
      duration: String,
      quality: String,
      description: String,
      released: String,
      country: String,
      genre: Array
  }
})

module.exports = {bannerSchema, homepageSchema, allMoviesSchema, tvSeriesSchema}
