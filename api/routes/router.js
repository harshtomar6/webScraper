let express = require('express')
let router = express.Router()
var request = require("./../controllers/request.js");

//Allow cross domain access
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Responds homepage data
router.get('/', function(req, res, next){
    var final_data = {"err": null, "body": {"top_data": null, "content": null}}

    //Top banner data
    request.getTopData('http://cmovieshd.com/cmovieshd', function(data){
        if(!data.err){
            final_data.body.top_data = data.body;

            //Content Data
            request.getData('http://cmovieshd.com/cmovieshd', function(data1){
                if(!data1.err){
                    final_data.body.content = data1.body;
                }else{
                    final_data.err = data1.err
                }
                console.log(final_data)
                res.send(final_data)
            })
        }
        else{
            final_data.err = data.err
            console.log(final_data)
            res.send(final_data)
        }
    })
});

router.get('/test', function(req, res, next){
    res.sendFile(__dirname+'/views/test.html');
})

//Responds Movie playable link
router.post("/play-movie", function(req, res, next){
    var movie_url = req.body['movie-url'];

    request.getPlayableMovie(movie_url, function(data){
        console.log(data);
        res.send(JSON.stringify({'data': data.body}));
    })
});

//Responds movie description nad other meta deta
router.post("/watch-movie", function(req, res, next){
    var movie_url = req.body['movie-url'];
    var final_data = {"err": null, "body": {"episodes": null, "content": null}}

    request.getMovieData(movie_url, function(data){
        if(!data.err){
            final_data.body.content = data.body;

            //Get multiple episodes link for TV-series
            request.getEpisodesData(movie_url+'watch', function(data1){
                if(!data1.err){
                    final_data.body.episodes = data1.body;
                }else{
                    final_data.err = data1.err
                }
                res.send(final_data)
            })
            console.log(final_data)
        }
        else{
            final_data.err = data.err
            res.send(final_data)
        }
    })
})

//Responds data for a specified movie
router.post('/search-movie', function(req, res, next){
    var query = req.body.search;

    request.getSearchResults(query, function(data){
        console.log(data);
        res.send(data);
    })
})

//Responds data for all movie tab
router.get('/all-movies', function(req, res, next){
    request.getData('http://cmovieshd.com/movies/', function(data){
        console.log(data)
        res.send(data)
    })
})

//Multiple pages data for all movies tab
router.get('/all-movies/*', function(req, res, next){
    var page = req.url.split('/')[2]
    console.log(page)
    request.getData('http://cmovieshd.com/movies/'+page, function(data){
        console.log(data)
        res.send(data)
    })
})

//Responds data for TV-series tab
router.get('/tv', function(req, res, next){
    request.getData('http://cmovieshd.com/tv-series/', function(data){
        console.log(data)
        res.send(data)
    })
})

//Multiple pages data for TV-series tab
router.get('/tv/*', function(req, res, next){
    var page = req.url.split('/')[2]
    console.log(page)
    request.getData('http://cmovieshd.com/tv-series/'+page, function(data){
        console.log(data)
        res.send(data)
    })
})

//Responds data for top-IMDB tab
router.get('/top-imdb/', function(req, res, next){
    request.getData('http://cmovieshd.com/top-imdb/', function(data){
        console.log(data)
        res.send(data)
    })
})

//Multiple pages data for top-IMDB
router.get('/top-imdb/*', function(req, res, next){
    var page = req.url.split('/')[2]
    console.log(page)
    request.getData('http://cmovieshd.com/top-imdb/'+page, function(data){
        console.log(data)
        res.send(data)
    })
})

router.get('/watch/*', function(req, res, next){
    var id = req.url.split('/');
    id = id.splice(2).join('/');
    console.log(id);

    res.send({data: id});
})

module.exports = router;
