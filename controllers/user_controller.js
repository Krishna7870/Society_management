const User = require('../models/members');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Guest = require('../models/guest');
const guestMailer = require('../mailers/guest_mailer');

const fs = require('fs');
const path = require('path');
module.exports.sign_in = function(req,res){
   
    return res.render('sign-in');
    
}
module.exports.user_profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user-profile',{
            profile_user: user
        });
    });
    
}
module.exports.profile_update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res, function(err){
            if(err){console.log('multer error:-',err);}
            user.headMember = req.body.headMember;
            user.email = req.body.email;
            user.no_Of_Member = req.body.no_Of_Member;
            user.contact = req.body.contact;
            user.flat_Number = req.body.flat_Number;
            user.building_Number = req.body.building_Number;
            user.no_Of_Vechile = req.body.no_Of_Vechile;
            user.password = req.body.password;
            if(req.file){
                if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                //this is saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarpath + '/'+ req.file.filename;
            }
           console.log('User Avatar Path', req.file);
            user.save();
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}
module.exports.create_session = function(req,res){
    console.log('Logged in successfully!');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}

module.exports.help = function(req,res){
    
    Post.find({})
    .populate('user')
    .populate({path:'comments', populate:{path:'user'}})
    .exec(function(err,posts){
        if(err){
            console.log(err);
        }
        
        return res.render('help',{
            posts:posts
        
          });
    });
}

module.exports.createPost = function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }, function(err, post){
        if(err){console.log('error in creating the post'); return}

        
            return res.redirect('back');
      
       
    });
}

module.exports.createComment = function(req,res){
Post.findById(req.body.post, function(err,post){
    if(post){
        Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post
        }, function(err, comment){
            if(err){console.log('error in creating the comment'); return}
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
    }
})
}

module.exports.destroyPost = function(req,res){
    Post.findById(req.params.id, function(err, post){
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.destroyComment = function(req,res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments:req.params.id}}, function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}


module.exports.create_invite_guest = function(req,res){
Guest.create(req.body , function(err, guest){
    if(err){console.log('Error in creating the invite guest!', err);return;}
    guestMailer.guestInvite(guest);
    return res.redirect('back');
})
}
