const mongoose = require('mongoose');

const carpenterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    charges:{
        type:String,
        required:true
    }

},{timestamps:true
});


const Carpenter = mongoose.model('Carpenter',carpenterSchema);
module.exports=Carpenter;