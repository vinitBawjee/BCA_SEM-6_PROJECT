const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  gender: { type: String, required: true },
  birthdate: { type: Date, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Seller", sellerSchema);
