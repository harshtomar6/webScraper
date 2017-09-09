let db = require('./../models/db.js')
let mongoose = require('mongoose')
let config = require('./../../config/config')

mongoose.Promise = require('bluebird')
mongoose.connect(config.DATABASE_URI)

db.updateBannerData(() => {
  console.log("FINALLY")
})
