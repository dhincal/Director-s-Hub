const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { 
        type:String,
        required: [true, '`{PATH}` space is required'],
        unique: [true, '`{VALUE}` has already taken'],
        maxlength:[15, '`{PATH}` space must be maximum (`{MAXLENGTH}`)'],
        minlength:[2, '`{PATH}` space must be minimum (`{MINLENGTH}`)'],
    },
    password:{
        type:String,
        required: true,
        minlength:[5, '`{PATH}` space must be minimum (`{MINLENGTH}`)'],
    }

});

module.exports = mongoose.model('User', UserSchema);