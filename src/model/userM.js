const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    password:{
        type: String,
        required: true,
        trim:true,
        min: 5,
        max: 32,
    },
    role: {
        type: String,
        default: "user"
    }
},

{timestamps: true , versionKey: false});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;