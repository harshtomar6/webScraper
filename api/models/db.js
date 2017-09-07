const mongoose = require('mongoose')
const Schema = require('./schema.js')
const request = require('./../controllers/request')

//models
var Banner = mongoose.model('Banner', Schema.bannerSchema)
var Homepage = mongoose.model('Homepage', Schema.homepageSchema)
var AllMovies = mongoose.model('AllMovies', Schema.allMoviesSchema)
var TvSeries = mongoose.model('TvSeries', Schema.tvSeriesSchema)


//Save Data functions
var saveBannerData = (url, callback) => {
  request.getTopData(url, (data) => {
    if(!data.err){
      data.body.forEach((arr) => {
        var banner = new Banner({
                                  name: arr.top_name,
                                  description: arr.top_des,
                                  image: arr.top_banner,
                                  watchLink: arr.top_link
                                })

        banner.save((err) => {
          callback(err)
        })
      })
    }else {
      callback(data.err)
    }
  })
}

var saveHomepageData = (url, callback) => {
  request.getData(url, (data) => {
    if(!data.err){
      data.body.forEach((arr) => {
        var homepage = new Homepage({
                                    name: arr.name,
                                    description: arr.movie,
                                    image: arr.thumbnail,
                                    watchLink: arr.watch,
                                    meta:{
                                      episode: arr.meta.episode
                                    }
                                  })

        homepage.save((err) => {
          callback(err)
        })
      })
    }else{
      callback(data.err)
    }
  })
}

var saveAllMoviesData = (url, callback) => {
  request.getData(url, function(data){
      if(!data.err){
        data.body.forEach((arr) => {

          request.getAjaxData(request.getURIName(arr.watch), function(data){
            if(!data.err){
              var allmovies = new AllMovies({
                name: arr.name,
                infoLink: arr.watch,
                image: arr.thumbnail,
                watchLink: arr.movie,
                meta: {
                  episode: arr.meta.episode,
                  imdb: data.body.imdb,
                  year: data.body.year,
                  duration: data.body.duration,
                  quality: data.body.quality,
                  description: data.body.description,
                  released: data.body.released,
                  country: data.body.country,
                  genre: data.body.genre
                }
              })

              allmovies.save((err) => {
                callback(err)
              })
            }
          })

        })
      }else{
        callback(data.err)
      }
  })
}

//Get Data Functions
var getBannerData = (callback) => {
  Banner.find({}, 'name description image watchLink', (err, d) => {
    callback(err, d)
  })
}

var getHomepageData = (callback) => {
  Homepage.find({}, 'name description image watchLink meta', (err, d) => {
    callback(err, d)
  })
}

var getAllMoviesData = (callback) => {
  AllMovies.find({}, 'name description image watchLink meta', (err, d) => {
    callback(err, d)
  })
}
module.exports = {
                  saveBannerData,
                  getBannerData,
                  saveHomepageData,
                  getHomepageData,
                  saveAllMoviesData,
                  getAllMoviesData
                }
