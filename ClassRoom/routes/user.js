const express = require("express");
const router = express.Router();


// USer
// Index Route 
router.get("/", (req, res) => {
    res.send("I am main route");
});


// Show Route 
router.get("/:id", (req, res) => {
    res.send("I am show route");
});


// Post Route 
router.post("/", (req, res) => {
    res.send("I am show route");
});


// Delete Route 
router.delete("/:id", (req, res) => {
    res.send("I am show route");
});


module.exports = router;
