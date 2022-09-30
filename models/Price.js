const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  ticker: {
    type: String,
  },
  openPrice: {
    type: Number,
  },
  highPrice: {
    type: Number,
  },
  lowPrice: {
    type: Number,
  },
  currPrice: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  tradingDay: {
    type: String,
  },
  prevClose: {
    type: Number,
  },
  change: {
    type: Number,
  },
  changePercentage: {
    type: String,
  },
  requestedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Price", priceSchema);
