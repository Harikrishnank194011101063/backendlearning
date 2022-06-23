var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
statuscode:200
,message:"hiiiiiiii"

  });
});

module.exports = router;
