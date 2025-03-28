const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Schmea define
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email : {
        type : String,
        required : true,
    },
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema); 