let db = require('./../models/db.js')
let mongoose = require('mongoose')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://heroku_r8wtvrh7:pp030v603cv137akko853r4ijp@ds119014.mlab.com:19014/heroku_r8wtvrh7')

db.getBannerData((err, doc) => {
  if(err)
    console.log(err)
  else
    console.log(doc)
})