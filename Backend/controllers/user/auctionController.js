const crypto = require("crypto");
const Auction = require("../../models/seller/auctionModel");
const Save_Auction = require("../../models/user/save_auctionModel");
const Bid = require("../../models/user/bidModel");
const FinalBid = require("../../models/user/finalBidModel");

const Razorpay = require("razorpay");
require("dotenv").config();

const get_Auction = async (req, res) => {
  try {
    const auction = await Auction.find({
      status: { $in: ["Active", "Inactive"] },
    }).sort({ createdAt: -1 });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const get_Auction_All = async (req, res) => {
  try {
    const auction = await Auction.find({
      status: { $in: ["Active", "Pending"] },
    });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const get_AuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      res.status(404).json({ message: "Auction not found" });
    }
    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const get_RecommendAuction = async (req, res) => {
  try {
    const auction = await Auction.aggregate([
      { $match: { status: { $in: ["Active", "Inactive"] } } },
      { $sample: { size: 4 } },
    ]);
    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const toggleSave = async (req, res) => {
  try {
    const { product_id } = req.body;
    const user_id = req.user.id;

    let savedAuction = await Save_Auction.findOne({ user_id });

    if (!savedAuction) {
      savedAuction = new Save_Auction({ user_id, products: [{ product_id }] });
    } else {
      const index = savedAuction.products.findIndex(
        (p) => p.product_id.toString() === product_id
      );
      if (index !== -1) {
        savedAuction.products.splice(index, 1);
      } else {
        savedAuction.products.push({ product_id });
      }
    }

    await savedAuction.save();
    res.json({
      saved: savedAuction.products.some(
        (p) => p.product_id.toString() === product_id
      ),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const checkSavedProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const user_id = req.user.id;

    const savedAuction = await Save_Auction.findOne({
      user_id,
      "products.product_id": product_id,
    });
    res.json({ saved: !!savedAuction });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserSavedProducts = async (req, res) => {
  try {
    const savedAuction = await Save_Auction.findOne({
      user_id: req.user.id,
    }).populate("products.product_id");
    res.json(
      savedAuction ? savedAuction.products.map((p) => p.product_id) : []
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved products" });
  }
};

const getUserBiddedAuctions = async (req, res) => {
  try {
    const userId = req.user.id;
    const userBids = await Bid.find({ "users.user_id": userId })
      .populate("auction_id")
      .populate("users.user_id");
    const auctions = userBids.map((bid) => bid.auction_id);
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const place_Bid = async (req, res) => {
  try {
    const { product_id, bid_amount } = req.body;
    const user_id = req.user.id;

    const auction = await Auction.findById(product_id);
    if (!auction) return res.status(404).json({ error: "Auction not found" });

    let bid = await Bid.findOne({ auction_id: product_id });

    if (!bid) {
      bid = new Bid({
        auction_id: product_id,
        users: [{ user_id, bids: [{ amount: bid_amount }] }],
      });
    } else {
      const userBid = bid.users.find((u) => u.user_id.toString() === user_id);
      if (userBid) {
        userBid.bids.push({ amount: bid_amount });
      } else {
        bid.users.push({ user_id, bids: [{ amount: bid_amount }] });
      }
    }

    await bid.save();
    auction.current_bid = bid_amount;
    await auction.save();

    res.json({
      message: "Bid placed successfully",
      current_bid: auction.current_bid,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserBiddingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const userBids = await Bid.find({ "users.user_id": userId }).populate(
      "auction_id"
    );

    let biddingHistory = [];
    userBids.forEach((bid) => {
      const user = bid.users.find((u) => u.user_id.toString() === userId);
      if (!user || !user.bids.length) return;

      user.bids.forEach((userBid, index, bidsArray) => {
        biddingHistory.push({
          product: bid.auction_id?.product_name || "Unknown Product",
          amount: userBid.amount,
          lastBid: index > 0 ? bidsArray[index - 1]?.amount || 0 : 0,
          bidCount: bidsArray.length,
          bidDate: new Date(userBid.bid_time).toLocaleDateString("en-GB"),
          bidTime: new Date(userBid.bid_time).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      });
    });

    res.status(200).json(biddingHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getLatestBids = async (req, res) => {
  try {
    const { auctionId } = req.params;

    if (!auctionId) {
      return res.status(400).json({ error: "Auction ID is required" });
    }

    const bidData = await Bid.findOne({ auction_id: auctionId })
      .populate("auction_id", "product_name status current_bid")
      .populate("users.user_id", "fullName email mobile address");

    if (!bidData) {
      return res.status(404).json({ error: "No bids found" });
    }

    // Flatten all bids
    let allBids = [];
    bidData.users.forEach((user) => {
      user.bids.forEach((bid) => {
        allBids.push({
          amount: bid.amount,
          bid_time: bid.bid_time,
          user: user.user_id,
        });
      });
    });

    // Sort by bid time (latest first)
    allBids.sort((a, b) => new Date(b.bid_time) - new Date(a.bid_time));

    // Get latest 3 bids
    const latest3Bids = allBids.slice(0, 3);
    res.status(200).json({
      auction: bidData.auction_id,
      bids: latest3Bids,
    });
  } catch (error) {
    console.error("Error fetching latest bids:", error);
    res.status(500).json({ error: "Error fetching latest bids" });
  }
};

const payement = async (req, res) => {
  res.json("Payement Details");
};

const order = async (req, res) => {
  const amountInPaise = req.body.amount *100;

  const razorpayInstance = new Razorpay({
    key_id: "rzp_test_b4iBWY0X70QR2V",
    key_secret: "6dBzpps9xTpwpG7P9cPeciUu",
  });

  try {
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log("Error in Razorpay order creation:", error);
        return res.status(500).json({ message: "Something went wrong!" });
      }

      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log("Error in order creation:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

const verify = async (req, res) => {
  const { razorpay_payment_id, razorpay_signature, razorpay_order_id } =
    req.body;

  console.log(req.body); // Check what data Razorpay is sending during verification

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();

      res.json({
        message: "Payment Successful",
      });
    } else {
      res.status(400).json({
        message: "Payment Signature Mismatch",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
    console.log(error);
  }
};

const getAllBidsforHome = async (req, res) => {
  try {
    // Step 1: Get all auctions with populated bid information
    const auctions = await Auction.find().exec();

    // Step 2: Get latest bid for each auction
    const auctionsWithLatestBid = [];

    for (const auction of auctions) {
      const bid = await Bid.findOne({ auction_id: auction._id }).exec();

      if (bid && bid.users.length > 0) {
        // Find the latest bid for each auction
        const allBids = bid.users.flatMap((user) => user.bids);
        if (allBids.length > 0) {
          const latestBid = allBids.sort((a, b) => b.bid_time - a.bid_time)[0]; // Sort bids by bid_time and get the latest
          auctionsWithLatestBid.push({
            auction_id: auction._id,
            product_name: auction.product_name,
            image: auction.image,
            latest_bid: latestBid.amount,
            end_date: auction.end_date,
          });
        }
      }
    }

    if (auctionsWithLatestBid.length === 0) {
      return res.status(404).json({ message: "No auctions with bids found." });
    }

    res.json(auctionsWithLatestBid);
  } catch (error) {
    console.error("Error fetching latest bids:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPendingPayments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const pendingPayments = await FinalBid.find({
      winnerId: userId,
      paymentStatus: "pending",
    }).populate("auctionId");

    res.status(200).json({ success: true, data: pendingPayments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  get_Auction,
  getLatestBids,
  get_AuctionById,
  get_RecommendAuction,
  toggleSave,
  checkSavedProduct,
  getUserSavedProducts,
  place_Bid,
  get_Auction_All,
  getUserBiddedAuctions,
  getUserBiddingHistory,
  payement,
  order,
  verify,
  getAllBidsforHome,
  getPendingPayments,
};
