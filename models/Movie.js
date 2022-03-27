const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    movieId: Schema.Types.ObjectId,
    directorId: Schema.Types.ObjectId,
    title:{
        type: String,
        required: [true, '`{PATH}` space is required'],
        maxlength:[15, '`{PATH}` space must be maximum (`{MAXLENGTH}`)'],
        minlength:[2, '`{PATH}` space must be minimum (`{MINLENGTH}`)'],
    },
    category: {
        type: String,
        maxlength:[30, '`{PATH}` space must be maximum (`{MAXLENGTH}`)'],
        minlength:[2, '`{PATH}` space must be minimum (`{MINLENGTH}`)'],
    },
    country: {
        type: String,
        maxlength:[30, '`{PATH}` space must be maximum (`{MAXLENGTH}`)'],
        minlength:[2, '`{PATH}` space must be minimum (`{MINLENGTH}`)'],
    },
    year: {
        type:Number,
        max: 2022,
        min:1900
    },
    imdbScore: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('movie', MovieSchema);