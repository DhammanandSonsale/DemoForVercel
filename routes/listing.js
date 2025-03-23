const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/AsyncWrap.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing } = require("../midleware.js");
const listingController = require("../controllers/listings.js");
// for file type image
const multer = require("multer");


// Cloud stores images
const {storage} = require("../cloudConfig.js");

// For set cloued strage
const upload = multer({storage});






// new listing Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Edit Route
router.get("/edit/:id", isLoggedIn, asyncWrap(listingController.renderEditForm));

// Using router.route
router
    .route("/")
    .get(asyncWrap(listingController.index))    //Main --Listings Route API

    .post(upload.single('listing[image]'), asyncWrap(listingController.NewListingPostRoute)); // add new listing

router
    .route("/:id")
    .get(asyncWrap(listingController.showRoute))  //Show Route
    .put(upload.single('listing[image]'), asyncWrap(listingController.updateRoute)) //Update Edited Form Route
    .delete(isLoggedIn, asyncWrap(listingController.deleteRoute));  //Delete Route



module.exports = router;
