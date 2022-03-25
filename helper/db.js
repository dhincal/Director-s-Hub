const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/DirectorsHub');
    mongoose.connection.on('open', () => {
        console.log('Mongoose connection success!!');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error:', err);
    })

}