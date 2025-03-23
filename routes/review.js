const express = require("express");
const router = express.Router({mergeParams: true});
const asyncWrap = require("../utils/AsyncWrap.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../midleware.js");

const reviewController = require("../controllers/reviews.js")


// For Adding Reviews POST ROUTE
router.post("/", isLoggedIn, validateReview, asyncWrap(reviewController.createReview));



// For deleting Reviews Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, asyncWrap(reviewController.deleteReview));


module.exports = router;