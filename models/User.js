const mongoose = require("mongoose");

const User = mongoose.Schema({
    Email : String,
    Password: String


})

const UserModel = mongoose.model("User",User);
module.exports = UserModel