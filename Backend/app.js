const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userContactusRoute = require('./routes/userContactusRoute')

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/online_auction",userContactusRoute);

module.exports = app;
