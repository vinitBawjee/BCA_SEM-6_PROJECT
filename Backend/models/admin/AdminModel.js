const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  gender: { type: String, enum: ['Male', 'Female'] },
  birthdate: { type: Date },
  password: { type: String, required: true }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
