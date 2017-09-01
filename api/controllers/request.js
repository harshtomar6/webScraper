var cheerio = require('cheerio');
var request = require('request');

var getTopData = function(url, callback){

  var movie_banner = [], movie_link =[], movie_name = [], movie_desc = [], data = []

  var final_data = {
    "err": null,
    "body": null
  }

  request(url, (err, res, body) => {
    if(!err && res.statusCode === 200){

      var $ = cheerio.load(body);
  
      $('.swiper-slide', 'div .swiper-wrapper').each(function(){    
        var style = $(this).attr('style');
    
        style = style.split('(')[1];
        style = style.substr(0, style.length-2);
        
        movie_banner.push(style);
      })     

      $('.slide-link', 'div .swiper-slide').each(function(){
        movie_link.push($(this).attr('href'))
        movie_name.push($(this).attr('title'));
      })

      $('p', '.slide-caption').each(function(){
        movie_desc.push($(this).text())
      })

      for(var i=0;i<movie_link.length;i++)  
        data.push({
          "top_banner": movie_banner[i],
          "top_link": movie_link[i],
          "top_name": movie_name[i],
          "top_des": movie_desc[i]
        })

      final_data.body = data
    }else{
      final_data.err = err
    }
    callback(final_data)
  })
}


var getData = function(url, callback){
  var links = [], pages = [], watchlinks = [], meta = [], title = [], metaLink = [];
  var data = [], j=0;

  var final_data = {
    'err': null,
    'body': null
  }

  request(url, function(err, res, body){
    if(!err && res.statusCode === 200){
      var $ = cheerio.load(body)

      $('a', 'div .ml-item').each(function(){
        var movie_link = $(this).attr('href');
        var link = $(this).attr('href')+'watch/';
        links.push(link);
        watchlinks.push(movie_link);
        metaLink.push($(this).attr('rel'))
        title.push($(this).attr('title'));
      });
      
      $('img', 'div .ml-item').each(function(){
        var img = $(this).attr('data-original');
        pages.push(img);
      });

      $('.mli-eps, .mli-quality', 'div .ml-item').each(function(){
        var episode = $(this).text()
          
        meta.push({"episode":episode});
      });
      
      

      for(var i=0;i<links.length;i++)
        data.push({
          "meta": meta[i],
          "thumbnail": pages[i],
          "watch": watchlinks[i], 
          "movie": links[i], 
          "name": title[i]
        });
              
      final_data.body = data;
          
    }else {
      final_data.err = err;
    }
    callback(final_data);
  });
}

function metaRunner(arr, callback){
  var a = arr.slice(0);
  var final = [];
  (function getOne(){
    var req = a.splice(0,1)[0];

    getMetaData(req, function(data){
      if(!data.err)
        final.push(data.body);
      if(a.length == 0){
        callback(final)
      }else
        getOne();
    })
  })()
}

var getMetaData = function(url, callback){
  var final_data = {
    "err": null,
    "body": null
  }

  var imdb_rating, year=[], data = [];

  request(url, function(err, res, body){
    if(!err && res.statusCode === 200){ 
      var $ = cheerio.load(body)

      $('.jt-imdb', 'div').each(function(){
        imdb_rating = $(this).text();
      })

      $('.jt-info', 'div').each(function(){
        year.push($(this).text())
      })

      for(var i=0;i<year.length;i++)
        data.push({
          "imdb": imdb_rating,
          "year": year
        })

      final_data.body = data
    }else{
      final_data.err = err
    }

    callback(final_data)
  })

}

var getPlayableMovie = function(url, callback){
  var watch_link;
  var final_data = {
    'err': null,
    'body': null
  }

  request(url, function(err, res, body){
    if(!err && res.statusCode === 200){
      var $ = cheerio.load(body)

      $('script','div #content-embed').each(function(){
        scriptData = $(this).text();
        watch_link = scriptData.substr(scriptData.indexOf('src')+5, scriptData.indexOf('"'))
        watch_link = watch_link.substr(0, watch_link.indexOf('"'))
      })

      final_data.body = watch_link;
    }else{
      final_data.err = err;
    }
    callback(final_data);
  })
}

var getSearchResults = function(query, callback){

  var final_data = {
    'err': null,
    'body': null
  }

  var data = [],links = [], title = [], pages = [], meta = [];

  request('http://cmovieshd.com/search/?q='+query, function(err, res, body){
    if(!err && res.statusCode === 200){

      var $ = cheerio.load(body);
      
      $('a', 'div .ml-item').each(function(){
        var link = $(this).attr('href');
        links.push(link);
        title.push($(this).attr('title'));
      });

      $('img', 'div .ml-item').each(function(){
        var img = $(this).attr('data-original');
        pages.push(img);
      });

      $('.mli-eps, .mli-quality', 'div .ml-item').each(function(){
        var episode = $(this).text()
          
        meta.push(episode);
      });

      for(var i=0;i<links.length;i++)
        data.push({
          "thumbnail": pages[i], 
          "watch": links[i], 
          "meta": meta[i],
          "name": title[i]
        })

      final_data.body = data;
    }else
      final_data.err = err;

    callback(final_data)
  })

}

var getEpisodesData = function(url, callback){
  var final_data = {
    'err': null,
    'body': null
  }, data = [], links = [], episodes = []

  request(url, function(err, res, body){
    if(!err && res.statusCode == 200){
      var $ = cheerio.load(body)

      $('a', 'div #server-3').each(function(){
        var link  = $(this).attr('href');
        var text = $(this).text()

        links.push(link)
        episodes.push(text)
      })

      for(var i=0;i<links.length;i++){
        data.push({
          "links": links[i],
          "episodes": episodes[i]
        })
      }

      final_data.body = data
    }else
      final_data.err = err;

    callback(final_data)
  })
}

var getMovieData = function(url, callback){
  
  var final_data = {
    'err': null,
    'body': null
  }, data = []
  var temp = []
  var movie_title = [], movie_des = [], movie_banner = [], meta = {
    "thumb": '',
    "genre": [],
    "director": '',
    "country": '',
    "cast": [],
    "imdb": '',
    "duration": '',
    "quality": '',
    "release": ''
  };

  request(url, function(err, res, body){
    if(!err && res.statusCode === 200){

      var $ = cheerio.load(body);

      $('a', '#mv-info').each(function(){
        
        var style = $(this).attr('style');
        style = style.split('(')[1];
        style = style.substr(0, style.length-1);
        
        movie_title.push($(this).attr('title'));
        movie_banner.push(style);

      })

      $('.des div, .des').each(function(){
        var text = $(this).text();

        var t2 = text.replace(', broadcast at CMOVIESHD.COM', ' ')
        
        movie_des.push(t2)
      })

      $('img', '.thumb').each(function(){
        var thumbnail = $(this).attr('src');

        meta.thumb = thumbnail;
      })

      $('a[itemprop]', '.nopadding').each(function(){
        var t = $(this).attr('title')
        meta.genre.push(t);
      })

      $('a[itemprop!="genre"]', '.nopadding').each(function(){
        var t = $(this).attr('title')
        temp.push(t);
      })

      meta.director = temp[1];
      meta.country = temp[2];

      for(var i=3;i<temp.length;i++)
        meta.cast.push(temp[i]);
      
      meta.imdb = $('imdb', '.nopadding').text()
      meta.duration = $('time', '.nopadding').text()
      meta.quality = $('.quality', '.nopadding').text()
      meta.release = $('meta', '.nopadding').attr('content')
      
      getData(url, function(success){
        console.log(data)

        for(var i=0;i<movie_title.length;i++)
        data.push({
          "movie-title": movie_title[i], 
          "movie-des": movie_des[i], 
          "movie-banner": movie_banner[i],
          "play-link": url+'watch/',
          "meta": meta,
          "similar-movies": success.body
        })
      
        final_data.body = data;

        callback(final_data)
      })
    }else
      final_data.err = err;
  })
}

module.exports = {
                  getData: getData, 
                  getMovieData: getMovieData, 
                  getPlayableMovie: getPlayableMovie, 
                  getSearchResults: getSearchResults, 
                  getTopData: getTopData,
                  getEpisodesData: getEpisodesData
                 }