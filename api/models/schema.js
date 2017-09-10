const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bannerSchema = new Schema({
  name: String,
  description: String,
  image: String,
  watchLink: String
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

let listSchema = new Schema({
  listName: String,
  content: Array
})

let homepageSchema = new Schema({
  listName: String,
  content: Array
})

module.exports = {bannerSchema, homepageSchema, allMoviesSchema, tvSeriesSchema, listSchema}
