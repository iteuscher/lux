var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {

  //let data = req.app.dirkdirkdirk
  
  let name_01 = "bob's lux"
  let admin_01 = "bob"
  let q1_01 = "whip?"
  let q2_01 = "dab?"

  let name_02 = "dirk's lux"
  let admin_02 = "dirk"
  let q1_02 = "dirk?"
  let q2_02 = "ten?"

  res.render('luxes', {
      title: 'Luxes',
      lux_01: [
        name_01,
        admin_01,
        q1_01,
        q2_01
      ],
      lux_02: [
        name_02,
        admin_02,
        q1_02,
        q2_02
      ]
  });
  //  res.sendFile(path.resolve('views/luxes.html'));

});









module.exports = router;
