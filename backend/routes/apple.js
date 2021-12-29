var express = require('express');
var router = express.Router();
var apples = require('../apple_pie.json');

router.get('/', function (req, res, next) {
 res.send(apples)
});

router.get('/:name', function (req, res, next) {

  var name = parseInt(req.params.name, 10)
  var apple = apples.filter(function (apple) {
    return apple.name === name
 });

  res.send(apple)
});
module.exports = router;
