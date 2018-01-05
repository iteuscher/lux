var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {

  let name_01 = "bob"
  let time_01 = "monday"

  let name_02 = "dirk"
  let time_02 = "friday"

  res.render('users', {
      title: 'Users',
      lux_01: [
        name_01,
        time_01
      ],
      lux_02: [
        name_01,
        time_02
      ]
  });

});

module.exports = router;
