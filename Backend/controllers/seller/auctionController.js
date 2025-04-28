const Auction = require("../../models/seller/auctionModel");
const Notification = require("../../models/seller/NotificationModel");
const FinalBid = require("../../models/user/finalBidModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/seller/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single("image");

const createAuction = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: "Image is required" });

        try {
            const { product_name, description, starting_price, increment_price, quantity, product_type, start_date, end_date, seller_id } = req.body;

            if (!seller_id) return res.status(400).json({ error: "Seller ID is required" });

            const auction = new Auction({
                product_name,
                description,
                starting_price,
                increment_price,
                quantity,
                product_type,
                start_date,
                end_date,
                image: req.file.filename,
                status: "Pending", 
                seller_id, 
                current_bid: starting_price
            });

            await auction.save();
            res.status(201).json({ message: "Auction added successfully", auction });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    });
};

const getSellerDashboardStats = async (req, res) => {
  try {
    const seller_id = req.query.seller_id;
    if (!seller_id) {
      return res.status(400).json({ message: "Seller ID is required in query" });
    }

    const auctions = await Auction.find({ seller_id });
    const finalBids = await FinalBid.find().populate("auctionId");

    const sellerFinalBids = finalBids.filter(
      bid => bid.auctionId?.seller_id?.toString() === seller_id
    );

    const totalEarnings = sellerFinalBids.reduce((acc, bid) => acc + bid.finalAmount, 0);
    const completedOrders = auctions.filter(a => a.status === "Completed").length;

    const auctionStats = auctions.reduce((acc, auction) => {
      acc[auction.status] = (acc[auction.status] || 0) + 1;
      return acc;
    }, {});

    const paymentStats = sellerFinalBids.reduce((acc, bid) => {
      acc[bid.paymentStatus] = (acc[bid.paymentStatus] || 0) + 1;
      return acc;
    }, {});

    const enrichedAuctions = auctions.map(a => {
      const bid = sellerFinalBids.find(b => b.auctionId._id.toString() === a._id.toString());
      return {
        _id: a._id,
        product_name: a.product_name,
        earnings: bid ? bid.finalAmount : 0,
      };
    });

    res.json({
      auctions: enrichedAuctions,
      totalEarnings,
      completedOrders,
      auctionStats,
      paymentStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


const getAuction = async (req, res) => {
    try {
      const seller_id= req.params.seller_id;
      const auction = await Auction.find({
        seller_id: seller_id,
        status: { $in: ['Pending', 'Rejected'] }
      })
      if (auction.length === 0) return res.status(404).json({ message: "Auction not  found " });
      res.status(200).json(auction);
    } catch (error) {
      console.error("Error in getAuction:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const getRejectedNotifications = async (req, res) => {
    try {
      const { seller_id } = req.params;

      const notifications = await Notification.find({ sellerId: seller_id, topic: "rejected" })
        .populate("auctionId", "_id image product_name")
        .sort({ createdAt: -1 })
        .lean();
  
      if (!notifications.length) {
        return res.status(404).json({ message: "No rejected auctions found" });
      }

      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notifications" });
    }
  };
  

  const deleteAuction = async (req, res) => {
    try {
        await Auction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Auction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
  };

const getAuctionAll = async (req, res) => {
  try {  
    const Auction = await Auction.find(); 
    if (!Auction) return res.status(404).json({ message: "User not found" });
    res.status(200).json(seller);  
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateAuctionAprove = async (req, res) => {
  try {
    const auction_id = req.params.id;
    const auction = await Auction.findOneAndUpdate(
      { _id: auction_id, status: "Pending" },
      { $set: { status: "Active" } },        
      { new: true }                          
    );
      res.status(200).json(auction);
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
};

const updateAuctionRejectDescription = async (req, res) => {
  try {
    const auction_id = req.params.id;
    const description = req.body.description;    
    const auction = await Auction.findOneAndUpdate(
      { _id: auction_id },
      { $set: { status: "Reject", Rejection: description } },
      { new: true }
    );            
      res.status(200).json(auction);
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
};

const updateAuction = async (req, res) => {
  upload(req, res, async (err) => {  
      if (err) return res.status(400).json({ error: err.message });

      try {
          const { id } = req.params;

          if (Object.keys(req.body).length === 0) {
              return res.status(400).json({ message: "No data received in the request" });
          }

          const { product_name, description, starting_price, increment_price, quantity, product_type, start_date, end_date, status } = req.body;

          const updateData = {
              product_name,
              description,
              starting_price,
              increment_price,
              quantity,
              product_type,
              start_date,
              end_date,
              status: "Pending",
          };

          if (req.file) {
              updateData.image = req.file.filename; 
          }

          const updatedAuction = await Auction.findByIdAndUpdate(id, updateData, {
              new: true,
              runValidators: true,
          });

          if (!updatedAuction) {
              return res.status(404).json({ message: "Auction not found" });
          }

          res.status(200).json({ message: "Auction updated successfully", auction: updatedAuction });
      } catch (error) {
          res.status(500).json({ message: "Error updating auction", error: error.message });
      }
  });
};

const getAuctionsStatus = async (req, res) => {
  try {
      const { status, seller_id } = req.query;

      if (!seller_id) {
          return res.status(401).json({ message: "Unauthorized access" });
      }

      const query = { seller_id };
      if (status && status !== "All") {
          query.status = status;
      }

      const auctions = await Auction.find(query);
      res.json(auctions);
  } catch (error) {
      res.status(500).json({ message: "Server Error", error });
  }
};

const getAuctionById = async (req, res) => {
  try {
      const { id } = req.params;
      const auction = await Auction.findById(id);
      
      if (!auction) {
          return res.status(404).json({ message: "Auction not found" });
      }

      res.status(200).json(auction);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};  
  


module.exports = { getSellerDashboardStats, createAuction,getAuction,deleteAuction,getAuctionAll,updateAuctionAprove,updateAuctionRejectDescription,getRejectedNotifications,getAuctionsStatus,getAuctionById, updateAuction };

