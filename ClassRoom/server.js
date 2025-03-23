const express = require("express");
const app = express();
// const users = require("./routes/user.js")
// const posts = require("./routes/post.js");
// // User
// app.use("/user", users);

// // Posts
// app.use("/posts", posts);

//== Express session
const session = require("express-session");


const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));

// For reg success flash message
const flash = require("connect-flash");
app.use(flash());
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

// Requiring EJS
// require path
const path = require("path");
// Set EJS as the template engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));


// For user registration session
app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error", "user not registered");   
    }else{
        req.flash("success", "user registered successfully!");
    }
    // console.log(req.session);
    res.redirect("/hello");
});

// above info we can access throw req.session
app.get("/hello", (req, res) => {
    // res.send(`hello, ${req.session.name}`)
    res.render("page.ejs", {name : req.session.name})
});




// app.get("/test", (req, res) => {
//   if (req.session.count) {
//     req.session.count += 1;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`You sent a req ${req.session.count} times`);
// });



app.listen(3000, () => {
  console.log("Server is listening");
});
