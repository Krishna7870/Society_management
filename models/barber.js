const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
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


const Barber = mongoose.model('Barber',barberSchema);
module.exports=Barber;