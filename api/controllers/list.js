const mongoose = require('mongoose')
const db = require('./../models/db')
let config = require('./../../config/config')

mongoose.Promise = require('bluebird')
mongoose.connect(config.DATABASE_URI)

var listData = {
  listName: "Movies with IMDB rating 8.7",
  content: ''
}

/*db.AllMovies.find({"meta.imdb": "8.7"}, (err, doc) => {
  if(!err){
    listData.content = doc
    //console.log(listData)
    db.createNewList(listData, (err) => {
      if(err)
        console.log(err)
      else {
        console.log("New List Created")
      }
      mongoose.connection.close()
    })
  }
})*/

/*db.Fmovies.find({}, (err, doc) => {
  if(err)
    console.log(err)
  else{
    data = []
    doc.forEach(d => {
      db.AllMovies.findOne({"name": d.name}, (err, m) => {
        if(err)
          console.log(err)
          if(m !== null)
            data.push(m)
          console.log(data.length)

      })
    })
  }
})*/

db.Fmovies.find({}, (err, doc) => {
  if(err)
    console.log(err)
  else {

    doc.forEach((d) => {
      db.AllMovies.update({ "name": d.name },{"playLink": d.link}, (err) => {
        if(err)
          console.log(err)
        else {
          console.log("Updated")
        }
      })
    })

  }
})
