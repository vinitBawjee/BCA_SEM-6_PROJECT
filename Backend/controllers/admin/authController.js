const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin/AdminModel");
const User = require("../../models/user/userModel");
const Seller = require("../../models/seller/sellerModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Admin not found" });

    if (user.password !== password) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({
      success: true,
      message: "Login successful",
      admin_id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: "admin",
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserAccount = async (req, res) => {
  try {
    const userData = await User.find(); 
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching seller data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSellerAccount = async (req, res) => {
  try {
    const userData = await Seller.find(); 
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching seller data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Seller.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = { login, getUserAccount, getSellerAccount, deleteUser, deleteSeller };
