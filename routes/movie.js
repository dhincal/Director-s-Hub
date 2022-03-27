var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie');


//Find all movies
router.get('/', (req, res) => {
  const promise = Movie.aggregate([
    {
      $lookup:{
        from:'directors', 
        localField:'directorId',
        foreignField:'_id', 
        as:'director'
      }
    },
    { 
      $unwind: '$director'
    }
  
  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})

//Find movies by ID
router.get('/:movieId', (req,res,next) => {
  const promise = Movie.findById(req.params.movieId);

  promise.then((movie) => {

    res.json(movie);
  }).catch((err) => {
    next({ message:"No movie found", code:90 });
  });

});

//Create a new Movie
router.post('/', (req, res, next) => {
  
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data) => {
    res.json({status:1})
  }).catch((err) => {
    res.json(err);
  })

});

//Update an Movie
router.put('/:movieId', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movieId, req.body, {new:true});
  
  promise.then((movie) => {
    res.json({status:200});
  }).catch(() => {
    next({ message:"No movie found", code:90});
  });
});

//Delete an Movie
router.delete('/:movieId', (req, res, next) => {
  const promise = Movie.findByIdAndDelete(req.params.movieId);

  promise.then((data) => {
    res.json({status:1});
  }).catch(() => {
    next({message: "No movie found", code:90});
  });
});

//Sort Top 10 Movies
router.get('/list/topten', (req,res) => {
  const promise = Movie.find({}).limit(10).sort({imdbScore:-1});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//List The Movies Made Between Dates
router.get('/list/between/:startYear/:endYear', (req,res) => {
  const {startYear, endYear} = req.params;
  const promise = Movie.find(
    {
      year: {"$gte" : parseInt(startYear), "$lte" : parseInt(endYear)}
    }
  );

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
})


module.exports = router;
