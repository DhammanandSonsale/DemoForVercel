const Listing = require("../models/listing.js");
const initData = require("../init/data.js");



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

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: "67dbd761cc8f8c9eb5abf842"
    }));
    await Listing.insertMany(initData.data); 
    console.log("Data was initialized");
}

initDb();