const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});

const Legacy = require("./legacy");

exports.Legacy = Legacy;
