const Listing = require("../models/listing");
const cloudinary = require("cloudinary");
// Main Indes Route
module.exports.index = async (req, res, next) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
  console.log("Listing Main Route");
};

// New Create Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// new listing Post Route
module.exports.NewListingPostRoute = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Show Route
module.exports.showRoute = async (req, res, next) => {
  const { id } = req.params;
  const perticularListing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!perticularListing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  console.log(perticularListing);
  res.render("listings/show.ejs", { perticularListing });
  console.log("Show Route");
};

// Edited Route
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const perticularListing = await Listing.findById(id);
  // console.log(perticularListing);
  if (!perticularListing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = perticularListing.image.url;
  if (originalImageUrl.includes("/upload/")) {
    originalImageUrl = originalImageUrl.replace(
      "/upload/",
      "/upload/w_250/"
    );
  }

  res.render("listings/edit.ejs", { perticularListing, originalImageUrl });
  console.log("Edit Route");
};

// Update Route
module.exports.updateRoute = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.deleteRoute = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
  console.log("Delete Route");
};