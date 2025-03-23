const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");

// Schmea define
const Schema = mongoose.Schema;

const listingSchma = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,

    image: {
        url: String,
        filename: String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
});


listingSchma.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews }})
    }
});

const Listing = mongoose.model("Listing", listingSchma);

// export thee schema
module.exports = Listing;