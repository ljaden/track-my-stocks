const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Portfolio = require("../models/Portfolio");

router.get("/", ensureAuth, async (req, res) => {
  const stocks = await Portfolio.find({ user: req.user.id });

  // console.log(stocks);
  // const value =
  // console.log(value);
  stocks["value"] = stocks.reduce((total, count) => total + count.equity, 0);

  res.render("dashboard", { stocks: stocks });
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    await Portfolio.create({
      ticker: req.body.ticker,
      company: "placeholder",
      shares: req.body.shares,
      price: 9999,
      profitLoss: 9999,
      avgCPS: req.body.cost,
      equity: req.body.shares * req.body.cost,
      user: req.user.id,
    });

    console.log("New stock has been added");

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteStock/:id", async (req, res) => {
  try {
    const d = await Portfolio.findByIdAndDelete({ _id: req.params.id });

    // console.log(d);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
