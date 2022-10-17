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
  portfolioValue = stocks.reduce(
    (total, count) => total + count.marketValue,
    0
  );
  stocks["value"] = +portfolioValue.toFixed(2);

  console.log(stocks["value"], typeof stocks.value);
  // console.log(stocks);
  res.render("dashboard", { stocks: stocks });
});

router.post("/", ensureAuth, async (req, res) => {
  try {
    console.log(req.body);

    /*
     */
    let quote = await Price.findOne({ ticker: req.body.ticker });
    console.log("QUOTE".quote);
    if (quote) {
      // if data is returned
      const timeNow = Date.now();
      const lastUpdated = quote["requestedOn"];
      const daysAgo = (timeNow - lastUpdated.getTime()) / 86400000;

      console.log("daysAgo", daysAgo);
      if (daysAgo > 0.05) {
        // if last update was over 12 hours

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
    // console.log(tempt, "tempt");

    const price = await Price.findOne({ ticker: req.body.ticker });

    await Portfolio.create({
      ticker: req.body.ticker,
      company: "placeholder",
      shares: req.body.shares,
      price: price,
      profitLoss: (
        price.currPrice * req.body.shares -
        req.body.shares * req.body.cost
      ).toFixed(2),
      avgCPS: req.body.cost,
      // equity: (req.body.shares * req.body.cost).toFixed(2),
      marketValue: (price.currPrice * req.body.shares).toFixed(2),
      user: req.user.id,
    });

    console.log("New stock has been added");

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteStock/:id", ensureAuth, async (req, res) => {
  try {
    const d = await Portfolio.findByIdAndDelete({ _id: req.params.id });

    // console.log(d);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

router.put("/editStock/:id", ensureAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body);

    const after = await Portfolio.findByIdAndUpdate(
      req.params.id,
      {
        ticker: req.body.ticker,
        shares: req.body.shares,
        avgCPS: req.body.avgcps,
        profitLoss: (
          req.body.payload * req.body.shares -
          req.body.avgcps * req.body.shares
        ).toFixed(2),
      },
      {
        returnDocument: "after",
      }
    );

    // console.log(req.body.shares);

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
