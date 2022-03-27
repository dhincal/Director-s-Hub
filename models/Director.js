const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: { 
        type:String,
        required: [true, '`{PATH}` space is required'],
        maxlength:[60, '`{PATH}` space must be maximum (`{MAXLENGTH}`)'],
        minlength:[2, '`{PATH}` space must be minimum (`{MINLENGTH}`)'],
    },
    surname:{
        type:String,
        required: false,
        maxlength:[60, '`{PATH}` space must be maximum (`{MAXLENGTH}`)'],
        minlength:[2, '`{PATH}` space must be minimum (`{MINLENGTH}`)'],
    },
    bio: {
        type: String,
        maxlength: [1500, 'Maximum characters (`MAXLENGHT`) has been reached in `{PATH}`']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('director', DirectorSchema);