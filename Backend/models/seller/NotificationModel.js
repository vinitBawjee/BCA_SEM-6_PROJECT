const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: false, },
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: false, },
  message: { type: String, required: true, },
  topic: { type: String, required: true, },
  createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model("Notification", NotificationSchema);
