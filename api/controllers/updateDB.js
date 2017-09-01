let db = require('./../models/db.js')

db.saveBannerData('https://cmovieshd.com/cmovieshd', (err) => {

  console.log("Well this is working")

  if(err)
    console.log(err)
  else {
    console.log("Database updated")
  }
})
