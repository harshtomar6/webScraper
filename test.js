/*var driver = require('node-phantom-simple');

driver.create({ path: require('phantomjs').path }, function (err, browser) {
  return browser.createPage(function (err, page) {
    return page.open("http://cmovieshd.com/tv-series/billions-season-2/watch/", function (err,status) {
      console.log("opened site? ", status);
      page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function (err) {
          setTimeout(function () {
          return page.evaluate(function () {
            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
            var create = document.createElement;
            document.createElement = function (tag) {
              var elem = create.call(document, tag);
              if (tag === "video") {
                elem.canPlayType = function () { return "probably" };
              }
              return elem;
            };

            var data = $('body').html();

						return data;
          }, function (err,result) {
						if(err)
							console.log(err);
						else
            	console.log(result);
            browser.exit();
          });
        }, 5000);

      });
      });
  });
});*/


/*var request = require("request");
var cheerio = require("cheerio");

var final_data = {
    "err": null,
    "body": null
  }

  var imdb_rating, year=[], data = [];

  request('http://cmovieshd.com/ajax/movie_qtip/grow-house', function(err, res, body){
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

    console.log(final_data.body)
  })*/

  var request = require('request')

  request.post({
      headers: {'content-type': 'application/json'},
      url: 'http://localhost:3638/api/search-movie',
      form: {"search": 'The Toxic Avenger'}
    }, (err, res, body) => {
      if(err)
        console.log(err)
      else
        console.log(JSON.parse(body));
  })
