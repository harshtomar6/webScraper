const mongoose = require('mongoose')
const Schema = require('./schema.js')
const request = require('./../controllers/request')

//models
var Banner = mongoose.model('Banner', Schema.bannerSchema)

var saveBannerData = (url, callback) => {
  request.getTopData(url, (data) => {
    if(!data.err){
      var arr = data.body[0]

        var banner = new Banner({
                                  name: "Game of Thrones",
                                  description: "This is the Season 7 baby",
                                  image: "Some very ugly looking URL",
                                  watchLink: "Another ugly looking URL"
                                })

        banner.save((err) => {
          callback(err)
        })

    }else {
      callback(data.err)
    }
  })
}

var getBannerData = (callback) => {
  Banner.find({}, (err, d) => {
    callback(err, d)
  })
}

module.exports = {saveBannerData, getBannerData}
