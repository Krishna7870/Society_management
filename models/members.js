const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const memberSchema = new mongoose.Schema({
    headMember:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    no_Of_Member:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    flat_Number:{
        type:String,
        required:true
    },
    building_Number:{
        type:String,
        required:true
    },
    no_Of_Vechile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type: String
    }


},{timestamps:true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

memberSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
memberSchema.statics.avatarpath = AVATAR_PATH;

const Member = mongoose.model('Member',memberSchema);
module.exports=Member;