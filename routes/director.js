const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const Director = require('../models/Director');

//Add New Director
router.post('/', (req, res) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

//Show Directors With Their Movies
router.get('/', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from:'movies',
                localField:'_id',
                foreignField:'directorId',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio',           
                },
                movies: {
                    $push:'$movies',
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }
    ])
    promise.then((data) => {
        res.json(data);
    }).catch((err) =>{
        res.json(err);
    })
})


module.exports = router;