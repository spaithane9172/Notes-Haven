const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/note-haven";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("Connected to mongo db successfully.");
};

module.exports = connectToMongo;
