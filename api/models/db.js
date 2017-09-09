const mongoose = require('mongoose')
const Schema = require('./schema.js')
const User = require('./user')
const request = require('./../controllers/request')

//models
var Banner = mongoose.model('Banner', Schema.bannerSchema)
var Homepage = mongoose.model('Homepage', Schema.homepageSchema)
var AllMovies = mongoose.model('AllMovies', Schema.allMoviesSchema)
var TvSeries = mongoose.model('TvSeries', Schema.tvSeriesSchema)
var List = mongoose.model('List', Schema.listSchema)


//Save Banner Data function
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

//Save Homepage data function
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

//Scrap all movies from given url
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

//Get Banner Data Functions
var getBannerData = (callback, limit) => {
  Banner
    .find({}, 'name description image watchLink')
    .exec((err, d) => {
      callback(err, d)
    })
}

//Get homepage Data function
var getHomepageData = (callback) => {
  Homepage.find({}, 'name description image watchLink meta', (err, d) => {
    callback(err, d)
  })
}

//Get All Movies data function
var getAllMoviesData = (callback) => {
  AllMovies.find({}, 'name description image watchLink meta', (err, d) => {
    callback(err, d)
  })
}

//Update Banner data function
var updateBannerData = (callback) => {
  saveBannerData('https://cmovieshd.com/cmovieshd', (err) => {
    if(err)
      console.log(err)
    else{
      console.log("Database Updated")
    }
  })
  callback()
}

var registerUser = (data, callback) => {
  var user = new User()

  if(data.token === 'local'){
    user.local.firstName = data.body.firstName
    user.local.lastName = data.body.lastName
    user.local.email = data.body.email
    user.local.password = user.generateHash(data.body.password)
  }

  user.save((err) => {
    callback(err)
  })
}

//Export different function
module.exports = {
                  saveBannerData,
                  getBannerData,
                  saveHomepageData,
                  getHomepageData,
                  saveAllMoviesData,
                  getAllMoviesData,
                  updateBannerData,
                  registerUser
                }
