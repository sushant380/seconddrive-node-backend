const LocalStrategy= require('passport-local').Strategy;
const bcyrpt=require('bcryptjs');


module.exports=function(passport){
    passport.use( new LocalStrategy({usernameField:'username'},(username, password, done)=>{

    }));
}