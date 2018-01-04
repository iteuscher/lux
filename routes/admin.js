var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  let adminname = "Bob!";
  res.render('admin', { title: 'Admin Page', adminname: adminname });
  
});

module.exports = router;
