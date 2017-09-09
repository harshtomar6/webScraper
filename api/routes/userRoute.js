let express = require('express')
let router = express.Router()
let db = require('./../models/db')

//Allow cross domain access
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res, next) => {
  res.send()
})

router.post('/signup', (req, res, next) => {
  db.registerUser(req.body, (err) => {
    if(err)
      res.send(err)
    else {
      res.send("User Registered")
    }
  })
})

router.post('/login', (req, res, next) => {

})

module.exports = router;
