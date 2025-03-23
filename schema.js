const Joi = require("joi");
const { model } = require("mongoose");
const review = require("./models/review");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.object({
            url: Joi.string().uri().allow("", null),  // Allow valid URLs, empty strings, or null
            filename: Joi.string().allow("", null)    // Optional filename
        }).optional(), // Make image field optional
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating : Joi.number().min(1).max(5).required(),
        comment : Joi.string().required(),
    }).required(),
});