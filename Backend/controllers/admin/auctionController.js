const Auction = require("../../models/seller/auctionModel");
const Notification = require("../../models/seller/NotificationModel");
const Bid = require("../../models/user/bidModel");
const FinalBid = require("../../models/user/finalBidModel");
const Contact = require('../../models/user/Contact');
const nodemailer = require('nodemailer');
const User = require("../../models/user/userModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bawjee0@gmail.com",
    pass: "mumb xhcv amlv kyqi", 
  },
});

const getAuctionsByStatus = async (req, res) => {
    try {
      const { status } = req.query;
      let query = {};
  
      if (status && status !== "All") {
        query.status = status;
      }
  
      const auctions = await Auction.find(query);
      res.status(200).json(auctions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching auctions", error });
    }
};

const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    if (!auctions.length) return res.status(404).json({ message: "No auctions found" });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error });
  }
};

const getPendingAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({status: { $in: ['Pending', 'Inactive'] }});
    if (auctions.length === 0) return res.status(404).json({ message: "Auction not  found " });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error });
  }
};

const getCompleteAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({status: { $in: ['Complete'] }});
    if (auctions.length === 0) return res.status(404).json({ message: "Auction not  found " });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error });
  }
};

const updateStatus = async (req, res) => {
  try {
      const auction = await Auction.findByIdAndUpdate(
          req.params.id,
          { status: "Approved" },
          { new: true }
      );

      if (!auction) {
          return res.status(404).json({ message: "Auction not found" });
      }

      res.json({ message: "Status updated", auction });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

const rejectAuction = async (req, res) => {
  try {
    const { auctionId, reason } = req.body;

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.status = "Rejected";
    await auction.save();

    const notification = new Notification({
      auctionId,
      sellerId: auction.seller_id,
      message: `Auction rejected: ${reason}`,
      topic: "rejected",
    });
    await notification.save();

    res.status(200).json({ message: "Auction rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting auction" });
  }
};

const updateAuctionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    auction.status = status;
    await auction.save();

    res.status(200).json({ message: "Auction status updated", auction });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByIdAndDelete(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting auction", error });
  }
};

const completeAuction = async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    if (auction.status !== "Active") {
      return res.status(400).json({ message: "Only active auctions can be completed" });
    }

    const bidData = await Bid.findOne({ auction_id: id });
    if (!bidData) {
      return res.status(400).json({ message: "No bids found for this auction" });
    }

    let highestBid = { amount: 0, user_id: null };

    bidData.users.forEach(user => {
      user.bids.forEach(bid => {
        if (bid.amount > highestBid.amount) {
          highestBid = { amount: bid.amount, user_id: user.user_id };
        }
      });
    });

    if (!highestBid.user_id) {
      return res.status(400).json({ message: "No valid bids found" });
    }

    const finalBid = new FinalBid({
      auctionId: id,
      winnerId: highestBid.user_id,
      finalAmount: highestBid.amount,
      paymentStatus: "pending",
    });

    await finalBid.save();

    auction.status = "Completed";
    await auction.save();

    // ✉️ Email Notifications
    for (const user of bidData.users) {
      const userData = await User.findById(user.user_id);
      if (!userData || !userData.email) continue;

      const isWinner = user.user_id.toString() === highestBid.user_id.toString();
      const subject = isWinner ? "Congratulations! You Won the Auction 🎉" : "Auction Result";
      const text = isWinner
        ? `Dear ${userData.fullName},\n\nCongratulations! You have won the auction for "${auction.title}" with a bid of ₹${highestBid.amount}. Please proceed with the payment.\n\nThank you!`
        : `Dear ${userData.fullName},\n\nUnfortunately, you did not win the auction for "${auction.title}". Better luck next time!\n\nThank you!`;

      await transporter.sendMail({
        from: "bawjee0@gmail.com",
        to: userData.email,
        subject,
        text,
      });
    }

    res.status(200).json({ message: "Auction completed and emails sent successfully", finalBid });

  } catch (error) {
    console.error("Error completing auction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFinalBids = async (req, res) => {
  try {
      const finalBids = await FinalBid.find()
          .populate("auctionId")
          .populate("winnerId");

      res.status(200).json(finalBids);
  } catch (error) {
      res.status(500).json({ message: "Error fetching final bids", error });
  }
};



const sendResponseEmail = (req, res) => {
  const { email, responseMessage } = req.body;

  if (!email || !responseMessage) {
    return res.status(400).json({ success: false, message: 'Email and response message are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sezansahin3011@gmail.com',  // Your Gmail address
      pass: 'ylcd erxz kmho oohq',   // Your Gmail password or app-specific password
    },
  });

  // Email details
  const mailOptions = {
    from: 'sezansahin3011@gmail.com',  // Sender email
    to: email,                    // Receiver email (the user's email)
    subject: 'Response to Your Query', 
    text: responseMessage,        // The response message from the admin
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
  });
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({status: { $in: ['Unread'] }}); // Fetch all contact messages
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }
    res.status(200).json(contacts); // Send the contacts as a response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const auctions = await Auction.find();
    const finalBids = await FinalBid.find();

    const totalEarnings = finalBids.reduce((acc, bid) => acc + bid.finalAmount, 0);
    const totalAuctions = auctions.length;
    const completedOrders = auctions.filter(a => a.status === "Completed").length;

    const auctionStats = auctions.reduce((acc, auction) => {
      acc[auction.status] = (acc[auction.status] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(auctionStats).map(status => ({
      name: status,
      count: auctionStats[status],
    }));

    const earningsData = auctions.map(a => ({
      product_name: a.product_name,
      earnings: finalBids.find(bid => bid.auctionId.toString() === a._id.toString())?.finalAmount || 0
    }));

    const paymentStatusData = finalBids.reduce((acc, bid) => {
      acc[bid.paymentStatus] = (acc[bid.paymentStatus] || 0) + 1;
      return acc;
    }, {});

    const paymentChartData = Object.keys(paymentStatusData).map(status => ({
      name: status,
      count: paymentStatusData[status],
    }));

    res.json({
      totalEarnings,
      totalAuctions,
      completedOrders,
      chartData,
      earningsData,
      paymentChartData,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};



module.exports = { getDashboardStats, getAllContacts, getAuctionsByStatus, getAllAuctions, getPendingAuctions, getCompleteAuctions, updateStatus, rejectAuction, updateAuctionStatus, deleteAuction, completeAuction, getFinalBids,sendResponseEmail,getAllContacts };