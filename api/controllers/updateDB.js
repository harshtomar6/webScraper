let db = require('./../models/db.js')
let mongoose = require('mongoose')
let config = require('./../../config')

mongoose.Promise = require('bluebird')
mongoose.connect(config.DATABASE_URI)

db.getBannerData((err, doc) => {
  if(err)
    console.log(err)
  else
    console.log(doc)
})