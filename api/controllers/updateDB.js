let db = require('./../models/db.js')
let mongoose = require('mongoose')
let config = require('./../../config/config')

mongoose.Promise = require('bluebird')
mongoose.connect(config.DATABASE_URI)

pages_list = []

URI = 'https://cmovieshd.com/movies/page-'
currentPage = 31

for(var i=currentPage;i<=35;i++){
  pages_list.push(URI+currentPage+'/')
  currentPage++;
}

console.log(pages_list)

pages_list.forEach(page => {
  db.saveAllMoviesData(page, (err) => {
      if(err)
        console.log(err)
      else
        console.log("Database Updated")
  })
})
