const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt");

const users = [];
router.post("/signup", async(req,res) =>{
    try {
        req.body.password =   await bcrypt.hash(req.body.password, 10)
        users.push(req.body)
        console.log(req.body)
        
    } catch (error) {
        console.log(error)
    }
  
  
    res.json(req.body )
}) 

module.exports = router