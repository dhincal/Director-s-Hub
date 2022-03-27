var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  const {username, password} = req.body;

  bcrypt.hash(password, 10).then((hash) => {

    const user = new User({ 
      username, 
      password: hash
    });
  
    const promise = user.save();
    promise.then((data) => { 
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });

  })

  
  
});

module.exports = router;
