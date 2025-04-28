const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    auction_id : { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
    users: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            bids: [
                {
                    amount: { type: Number, required: true },
                    bid_time: { type: Date, default: Date.now }
                }
            ]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Bid", bidSchema);  
