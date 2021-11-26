const mongoose = require("mongoose");
const mongoURL =
  "mongodb://localhost:27017/Splitwise?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// JJvUYhtDw2B2h96C
const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to mongo sucessfully");
  });
};
module.exports = connectToMongo;
