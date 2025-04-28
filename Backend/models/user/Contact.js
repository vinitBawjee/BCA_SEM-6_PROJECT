const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    phone: { type: String, required: true, unique: true },  
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Unread" ,required: true },
});

// contactSchema.index({ email: 1 });
// contactSchema.index({ phone: 1 });

module.exports = mongoose.model("Contact", contactSchema);
