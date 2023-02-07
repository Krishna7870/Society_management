const carpenter = require('../models/carpenter');
const barber = require('../models/barber');
module.exports.carpenters = function(req,res){
 
  carpenter.find((err, list) => {
    if (!err) {
      return res.render('carpenter',{
        carpenter_list:list
      });
    } else {
        console.log('Failed to retrieve the carpenter List: ' + err);
    }
});
    
}
module.exports.barbers = function(req,res){
 
  barber.find((err, list) => {
    if (!err) {
      return res.render('barber',{
        carpenter_list:list
      });
    } else {
        console.log('Failed to retrieve the barber List: ' + err);
    }
});
    
}