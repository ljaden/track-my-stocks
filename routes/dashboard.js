const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Portfolio = require("../models/Portfolio");
const Price = require("../models/Price");

const fetchDailyQuote = require("../controllers/api/dailyQuote");

router.get("/", ensureAuth, async (req, res) => {
  // const stocks = await Portfolio.find({ user: req.user.id });
  const stocks = await Portfolio.find({ user: req.user.id }).populate("price");

  // console.log(stocks);
  // const value =
  // console.log(value);
  stocks["value"] = stocks.reduce((total, count) => total + count.equity, 0);

  // console.log(req.user);
  res.render("dashboard", { stocks: stocks });
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    /*
     */
    let quote = await Price.findOne({ ticker: req.body.ticker });

    if (quote) {
      // if data is returned
      const timeNow = Date.now();
      const lastUpdated = quote["requestedOn"];
      const daysAgo = (timeNow - lastUpdated.getTime()) / 86400000;

      console.log("daysAgo", daysAgo);
      if (daysAgo > 0.05) {
        // if last update was over 12 hours
        console.log("hello");

        quote = await fetchDailyQuote(process.env.API_KEY, req.body.ticker);
        // Update document
        await Price.updateOne(
          {
            ticker: req.body.ticker,
          },
          {
            openPrice: quote["Global Quote"]["02. open"],
            highPrice: quote["Global Quote"]["03. high"],
            lowPrice: quote["Global Quote"]["04. low"],
            currPrice: quote["Global Quote"]["05. price"],
            volume: quote["Global Quote"]["06. volume"],
            tradingDay: quote["Global Quote"]["07. latest trading day"],
            prevClose: quote["Global Quote"]["08. previous close"],
            change: quote["Global Quote"]["09. change"],
            changePercentage: quote["Global Quote"]["10. change percent"],
            requestedOn: Date.now(),
          }
        );

        console.log(`${req.body.ticker} updated in Price`);
      }
    } else {
      // else null
      quote = await fetchDailyQuote(process.env.API_KEY, req.body.ticker);

      await Price.create({
        ticker: req.body.ticker.toUpperCase(),
        openPrice: quote["Global Quote"]["02. open"],
        highPrice: quote["Global Quote"]["03. high"],
        lowPrice: quote["Global Quote"]["04. low"],
        currPrice: quote["Global Quote"]["05. price"],
        volume: quote["Global Quote"]["06. volume"],
        tradingDay: quote["Global Quote"]["07. latest trading day"],
        prevClose: quote["Global Quote"]["08. previous close"],
        change: quote["Global Quote"]["09. change"],
        changePercentage: quote["Global Quote"]["10. change percent"],
      });
    }
    /*
     */

    const tempt = await Price.findOne({ ticker: req.body.ticker });

    console.log(tempt, "tempt");

    await Portfolio.create({
      ticker: req.body.ticker,
      company: "placeholder",
      shares: req.body.shares,
      price: await Price.findOne({ ticker: req.body.ticker }),
      profitLoss: 9999,
      avgCPS: req.body.cost,
      equity: (req.body.shares * req.body.cost).toFixed(2),
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
