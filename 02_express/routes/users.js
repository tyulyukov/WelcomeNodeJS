var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let result = {
    name: "tyulyukov maksym",
    username: "tyulyukov",
    speciality: "developer",
    age: 16
  }

  res.send(result)
});

module.exports = router;
