const mongoose = require("mongoose");

const finalBidSchema = new mongoose.Schema(
    {
        auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
        winnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
        finalAmount: { type: Number, required: true }, 
        paymentStatus: { 
            type: String, 
            enum: ["pending", "paid", "failed"], 
            default: "pending" 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FinalBid", finalBidSchema);
