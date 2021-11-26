const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileno: { type: Number, required: true, unique: true },
  friends: { type: [String] },
  balance: { type: Number },
  expenses: { type: Object },
  owe: { type: Number },
  owed: { type: Number },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
