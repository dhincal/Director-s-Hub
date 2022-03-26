const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    movieId: Schema.Types.ObjectId,
    title:{
        type: String,
        required: true,
    },
    category: String,
    country: String,
    year: Number,
    imdbScore: Number,
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('movie', MovieSchema);