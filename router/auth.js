const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport')
const express = require("express");
const router2 = express.Router()
const user = require("../models/User");

// function initialize(passport  ) {




function Authentication (){
  const authenticateUser = async (email, password, done) => {
    const foundedUSer = await user.findOne({Email: email}).then(async(rslt)=>{
            
        if( await bcrypt.compare(password, rslt.Password)){
            console.log(email, password)
            console.log(rslt)
            return done(null, rslt)
        }
        else{
            //if not, res.redirect to login with res.redrct(login.ejs, message ) and display the message on the flash-express
            return done(null, false, { message: 'Password incorrect' })
        }
        

     }).catch(()=> done(null, false, { message: 'No user with that email' })  )

 } 


   

  passport.use('local',new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, email: user.Email });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });





// router2.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }));
  
//   router2.get("/", async(req,res)=>{
    
//     res.send("hej")
//  })
 
}
module.exports = Authentication