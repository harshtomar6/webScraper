let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  res.sendFile('../../public/index.html');
})

router.get('/test', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send(ip)
})

module.exports = router;
