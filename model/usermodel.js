const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{type:String,
    required:true},
    password:{type:String,
    required:true},
    mailid:{type:String,
        required:true},
    distancerun:{type:String},
    calorieburned:{type:Number},    
    date:{type:Date,
    default:Date.now()}
});

module.exports = mongoose.model("authentication",userschema);