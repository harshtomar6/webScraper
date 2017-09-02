let db = require('./../models/db.js')
let mongoose = require('mongoose')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/movies')

db.saveAllMoviesData('https://cmovieshd.com/movies/page-6', (err) => {
  if(err)
    console.log(err)
  else {
    console.log("Database updated")
  }
})
