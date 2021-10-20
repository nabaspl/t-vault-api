const mongoose = require('mongoose');
var arrayValidator = require('mongoose-array-validator');
const SafeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    owner:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    secrets:{
        type: Array,
        uniqueItems: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
SafeSchema.plugin(arrayValidator);
module.exports = mongoose.model('Safe',SafeSchema);