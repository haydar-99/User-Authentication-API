const express = require("express");
const app = express()
const  bodyParser = require('body-parser');
const res = require("express/lib/response");
const router = require("./router/router") 

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.urlencoded({extended: false}))
app.use("/users", router)



app.listen(5000, ()=>{console.log("running on port 5000")})
