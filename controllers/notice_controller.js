const notification = require('../models/notification');

module.exports.notice = function(req,res){
    notification.find((err, notice) => {
        if (!err) {
          return res.render('notification',{
            notice_list:notice
          });
        } else {
            console.log('Failed to retrieve the notice List: ' + err);
        }
    });
}