const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const adminRouter = require('./routes/admin.router');
const db = require('./config/moongose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongo')(session);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
//make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.set('view engine', 'ejs');
app.set('views', './views');
//mongo store is used to store session cookie in db
app.use(session({
    name:'socio-ease',
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(100*60*100)
    }
    // store: new MongoStore(
    //     {
    //         mongooseConnection:db,
    //         autoRemove:'disabled'
            
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
  
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes/index'));
app.use('/admin', adminRouter);
app.listen(port, function(err){
    if(err){
        console.log("Error in running the server: ",err);
        return;
    }
    console.log('Server is up and running on port: ',port);
})