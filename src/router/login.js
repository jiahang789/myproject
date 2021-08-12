var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  console.log('访问login成功')
  res.send('访问login成功')
})
module.exports = router
