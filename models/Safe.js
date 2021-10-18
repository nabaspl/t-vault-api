const mongoose = require('mongoose');
const SafeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
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
        type:Array,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Safe',SafeSchema);