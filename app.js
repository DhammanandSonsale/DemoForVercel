// server port 
const port = 8080;

// *============== All pakages required here ================*
// required express
const express = require("express");
const app = express();


// Requiring EJS
// require path
const path = require("path");
// Set EJS as the template engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));

// for static file like css, js
app.use(express.static(path.join(__dirname, "/public")))


// requirning mongoose
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);  
}

main()
.then(() => {
    console.log("Connection successfull");
})
.catch((err) => {
    console.log("err");
});


// Module(mongo schema) requing 
const Listing = require("./models/listing.js");

// Handing post request
app.use(express.urlencoded({ extended: true }));


// For edit and update the data 
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


// ejs-mate For styling
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);



// For Error Handling Wrpasync
const asyncWrap = require("./utils/AsyncWrap.js");
const ExpressError = require("./utils/ExpressError.js");


// For mongo schma validation it is also error handling
const {listingSchema, reviewSchema} = require("./schema.js");
const { valid } = require("joi");


// for express session
const session = require("express-session");
const sessionOption = {
    secret : "mysecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    },
};


// For authentication of user
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");



// .env require
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
// console.log(process.env.SECRET);

// Root Route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});


// For flash msg to created listing
const flash = require("connect-flash");
app.use(session(sessionOption));
app.use(flash());


// For authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.use(User.createStrategy()); // This is correct

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    console.log(res.locals.success);
    next();
})


// for routing listing AND review AND user
const listings = require("./routes/listing.js")
app.use("/listings", listings);


const reviews = require("./routes/review.js");
app.use("/listings/:id/reviews", reviews);

// For user router
const userRouter = require("./routes/user.js")
app.use("/", userRouter);




app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error Handeler
app.use((err, req, res, next) => {
    let {status = 500, message = "Some Error Occured"} = err;
    res.render("error.ejs", {message});

});

app.listen(port, () => {
    console.log(`Server is listen on port ${port}`)
})