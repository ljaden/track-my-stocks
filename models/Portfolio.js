const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  ticker: {
    type: String,
  },
  company: {
    type: String,
  },
  shares: {
    type: Number,
  },
  price: {
    type: Number,
  },
  profitLoss: {
    type: Number,
  },
  avgCPS: {
    type: Number,
  },
  equity: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
