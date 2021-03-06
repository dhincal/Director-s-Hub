const express = require('express');
const mongoose = require('mongoose');
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
});

//Get an Specific Director
router.get('/:directorId', (req, res) => {
    const promise = Director.aggregate([
        {
            $match:{
                '_id': mongoose.Types.ObjectId(req.params.directorId)
            }
        },
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
});

//Update an Director
router.put('/:directorId', (req, res) => {
    const promise = Director.findByIdAndUpdate(
        req.params.directorId,
        req.body,
        {
            new:true,
        }
    );
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        next({message: 'No such director found', code: 404});
    });
});

//Delete an Director
router.delete('/:directorId', (req, res, next) => { 
    const promise = Director.findByIdAndDelete(req.params.directorId);

    promise.then((data) => {
        res.json({status: 1});
    }).catch(() => {
        next({message: 'No such director found director', code:404});
    });
});



module.exports = router;