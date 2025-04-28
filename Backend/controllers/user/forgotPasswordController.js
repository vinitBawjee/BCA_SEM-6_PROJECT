const User = require("../../models/user/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

let otpStore = {}; 

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bawjee0@gmail.com",
        pass: "mumb xhcv amlv kyqi",  
    },
});

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: "Email not found!" });

    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; 

    try {
        await transporter.sendMail({
            from: "bawjee0@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}`,
        });
        res.json({ success: true, message: "OTP sent to your email." });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP. Try again later." });
    }
};


// 2. Verify OTP
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (!otpStore[email]) {
        return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }
    if (otpStore[email].otp.toString() === otp.toString()) {
        return res.json({ success: true, message: "OTP verified." });
    }

    res.status(400).json({ success: false, message: "Invalid OTP!" });
};


// 3. Reset Password
exports.resetPassword = async (req, res) => {
    const { email, password } = req.body;

    if (!otpStore[email]) return res.status(400).json({ success: false, message: "OTP verification required!" });
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email]; 

    res.json({ success: true, message: "Password updated successfully." });
};
