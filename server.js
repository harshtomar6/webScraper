let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let apiRoute = require('./api/routes/router');
let homeRoute = require('./api/routes/homeRoute');

//Set Port
const port = process.env.PORT || 3638;

//Connect to database server
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://heroku_r8wtvrh7:pp030v603cv137akko853r4ijp@ds119014.mlab.com:19014/heroku_r8wtvrh7')

//View engine to ejs, just for testing purpose
app.set('view engine', 'ejs');

//All static data to public data, not used in api
app.use(express.static(__dirname+'/public'));

//Use BodyParser to simulate POST requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//All requests to http://localhost:3638/api/
app.use('/api', apiRoute);
app.use('/', homeRoute);

//Make the server to listen on specified port
app.listen(port, function(){
    console.log("Server is live at port "+port);
});
