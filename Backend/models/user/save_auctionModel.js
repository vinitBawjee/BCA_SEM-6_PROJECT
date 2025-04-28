const mongoose = require("mongoose");

const savedAuctionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" } }]
}, { timestamps: true });

module.exports = mongoose.model("SavedAuction", savedAuctionSchema);
