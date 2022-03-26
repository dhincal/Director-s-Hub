var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})

router.get('/:movieId', (req,res,next) => {
  const promise = Movie.findById(req.params.movieId);

  promise.then((movie) => {

    res.json(movie);
  }).catch((err) => {
    next({ message:"No movie found", code:90 });
  });

});

router.post('/', (req, res, next) => {
  
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data) => {
    res.json({status:1})
  }).catch((err) => {
    res.json(err);
  })

});

module.exports = router;
