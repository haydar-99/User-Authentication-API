const express = require("express");
const app = express()
const  bodyParser = require('body-parser');
const res = require("express/lib/response");
const router = require("./router/router") 
const mongoose = require("mongoose")
const env = require('dotenv').config()
const ejs = require("ejs")
// const router2 = require("./router/auth")
var passport = require('passport');
var session = require('express-session');


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

// initializePassport(passport)
 
app.set("view engine", ejs)
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.urlencoded({extended: false}))
app.use("/users", router)  
// app.use("/users", router2) 



mongoose
.connect(process.env.DATABASE_URL)
.then(()=>{console.log("connected to the database")
app.listen(5000, ()=>{console.log("running on port 5000")})
})
.catch(err=>{console.log(err)})



//  <!-- <% if (messages.error) { %>
//     <%= messages.error %>
//   <% } %> -->