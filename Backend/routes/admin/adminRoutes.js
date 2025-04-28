const express = require("express");
// const { getsellrAll } = require("../../controllers/seller/authController");
// const { getUserAll} = require("../../controllers/user/authController");
// const {get_Auction_All } = require("../../controllers/user/auctionController");
// const {updateAuctionAprove,updateAuctionRejectDescription,updateAuctionExpired} = require("../../controllers/seller/auctionController");
const { login, getUserAccount, getSellerAccount, deleteUser, deleteSeller } = require("../../controllers/admin/authController");

const { getDashboardStats, getAuctionsByStatus, getAllAuctions, getPendingAuctions, getCompleteAuctions, updateStatus, rejectAuction, updateAuctionStatus, deleteAuction, completeAuction, getFinalBids ,sendResponseEmail,getAllContacts} = require("../../controllers/admin/auctionController");

const router = express.Router();
router.post("/login", login);
router.get("/user-account", getUserAccount);
router.get("/seller-account", getSellerAccount);
router.delete("/user-account/:id", deleteUser);
router.delete("/seller-account/:id", deleteSeller);

router.get("/auctions-status", getAuctionsByStatus);
router.get("/seller-auctions", getAllAuctions);
router.get("/seller-pending-auction", getPendingAuctions);
router.get("/seller-complete-auction", getCompleteAuctions);
router.put("/update-status/:id", updateStatus);
router.post("/reject-auction", rejectAuction);
router.put("/auction-status/:id", updateAuctionStatus);
router.delete("/auction/:id", deleteAuction);
router.put("/auction-complete/:id", completeAuction);
router.get("/final-bids", getFinalBids);
let contacts = [
  {
    fullName: 'Sezan',
    email: 'sezansahin3011@gmail.com',
    phone: '7043834447',
    subject: 'website',
    message: 'hello',
  },
];

router.get('/contacts', getAllContacts);
router.post('/send-response', sendResponseEmail);
router.get('/dashboard-stats', getDashboardStats);

// router.get("/all/user", getUserAll); 
// router.get("/all/seller", getsellrAll);
// router.get("/all/auction", get_Auction_All);
// router.put('/approve/:id', updateAuctionAprove);
// router.put('/rejectproduct/:id', updateAuctionRejectDescription);
// router.put('/auctionexpired/all',updateAuctionExpired);
module.exports = router;
