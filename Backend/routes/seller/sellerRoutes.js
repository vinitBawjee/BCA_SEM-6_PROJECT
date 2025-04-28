const express = require("express");
const { getSellerDashboardStats, createAuction,getAuction,deleteAuction,getRejectedNotifications,getAuctionsStatus,getAuctionById, updateAuction } = require("../../controllers/seller/auctionController");
const authenticate = require("../../middlewares/authMiddleware");
const { register, login, getUserById, updateUser, changePassword} = require("../../controllers/seller/authController");
const { forgotPassword, verifyOTP, resetPassword } = require("../../controllers/seller/forgotPasswordController");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/user/:id", getUserById);
router.post("/update-user", authenticate, updateUser);
router.post("/change-password", authenticate, changePassword);

router.post("/add-auction", authenticate, createAuction);
router.get("/auctions-status", authenticate, getAuctionsStatus);
router.get("/auction-details/:id", authenticate, getAuctionById);
router.put("/update-auction/:id", authenticate, updateAuction);
router.get('/dashboard-stats',authenticate, getSellerDashboardStats);

router.get("/auction/:seller_id", getAuction);
router.get("/auctionreg/:seller_id", getRejectedNotifications); 


router.delete("/:id",deleteAuction);



module.exports = router;
