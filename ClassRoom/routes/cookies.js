app.use(cookieParser("secreatcode"));
const cookieParser = require("cookie-parser");


// For sending cookies
app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    // res.cookie("kay", "chalay");
    // res.cookie("kaya", "karto");
    // res.cookie("kaha", "hai");
    res.send("sent you some cookies");
});


// For Accessing Cookies
app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("I am root");
});

// Get data by cookies
app.get("/owner", (req, res) => {
    let {name = "Anoynomous"} = req.cookies;
    res.send(`Hii, ${name}`);
});

// Signed cookies
app.get("/signedcookies", (req, res) => {
    res.cookie("Made-In", "India", {signed : true});
    res.send("Signed cookies");
});

// To varify singed cookies
app.get("/varify", (req, res) => {
    console.log(req.signedCookies);
    res.send("Varified");
});