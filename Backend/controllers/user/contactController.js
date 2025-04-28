const Contact = require("../../models/user/Contact");

const submitContact = async (req, res) => {
    console.log(req.body); // Log incoming request
    try {
        const { fullName, email, phone, subject, message } = req.body;
        const newContact = new Contact({ fullName, email, phone, subject, message });
        await newContact.save();

        res.status(201).json({ message: "Contact form submitted successfully!" });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ error: "Server error while submitting contact form", details: error.message });
    }
};


module.exports = { submitContact };

