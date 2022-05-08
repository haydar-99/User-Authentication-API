const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt");
const { route } = require("express/lib/application");
const { hash } = require("bcrypt");

const users = [];
//create a user 
router.post("/signup", async(req,res) =>{
    const user = users.find(user => user.email == req.body.email)
    if (user) {
        res.send("this email is already in use")
    }
    try {
        req.body.password =   await bcrypt.hash(req.body.password, 10)
        users.push(req.body)
        
    } catch (error) {
        console.log(error)
    }
  
  
    res.json(req.body )
}) 

router.post("/login", async(req,res)=>{
    const user = users.find(user => user.email == req.body.email)
    if (user) {
        try {
            if(await bcrypt.compare(req.body.password, user.password)){ res.send("succefully logged")}
            else{res.send("wrong password")}
        } catch (error) {
            console.log(error)
        }
        
    }
    else{
        res.send("nothing is found ")
    }
  

})
module.exports = router