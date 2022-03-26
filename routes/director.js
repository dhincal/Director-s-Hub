const express = require('express');
const router = express.Router();

const Director = require('../models/Director');

router.get('/', (req, res) => {
    res.json({title: 'Director'});
})

module.exports = router;