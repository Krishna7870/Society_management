const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    
    no_of_guest:{
        type: String,
        required: true
    },
    otp : {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }
});
const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest;