const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt");
const { route } = require("express/lib/application");
const { hash } = require("bcrypt");
const user = require("../models/User");
const { send } = require("express/lib/response");

// const users = [];
//create a user 

router.get("/signup", (req, res)=>{

    res.render("signup.ejs")
})

router.post("/signup", async(req,res) =>{
    // const user = users.find(user => user.email == req.body.email)
    try {
         const ALreadyExisted = await user.find({Email: req.body.email})
         console.log(ALreadyExisted.length)

         if(ALreadyExisted.length > 0){res.send(" the email is already in use")}
         else{
            req.body.password =   await bcrypt.hash(req.body.password, 10)
            const newUser = await new user ({Email: req.body.email, Password: req.body.password})
            await newUser.save();            
                
            const users = await user.find();  
            console.log(users) 
            res.redirect("/users/login" )
         }
         
    } catch (error) {
        res.send(error)
    }
}) 




router.get("/login", async(req,res)=>{
    
   res.render("login.ejs")
})

router.post("/login", async(req,res)=>{
    try {
        const foundedUSer = await user.findOne({Email: req.body.email}).then(async(rslt)=>{
            
           if( await bcrypt.compare(req.body.password, rslt.Password)){
            res.send("succefully logged"   )
           }
           else{
            res.send("wrong password")
           }
           

        }).catch(()=>res.send("could not find the user"))

    } catch (error) {
        res.send(error.message)
    }
})


router.get("/logn", (req,res)=>{
    res.render("logn.ejs")
})
router.get("/sign", (req,res)=>{
    res.render("sign.ejs")
})

module.exports = router