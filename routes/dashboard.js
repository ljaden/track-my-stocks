const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Portfolio = require("../models/Portfolio");

router.get("/", ensureAuth, async (req, res) => {
  const stocks = await Portfolio.find({ user: req.user.id });

  console.log(stocks);

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
      avgCPS: req.body.cost / req.body.shares,
      equity: 999,
      user: req.user.id,
    });

    console.log("New stock has been added");

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
