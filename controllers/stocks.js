const fetchOverview = require("./api/overview");
const fetchNews = require("./api/news");
const fetchDailyQuote = require("./api/dailyQuote");

const getStocks = async (req, res) => {
  try {
    // const ticker = req.params.ticker.toLowerCase();
    // const ticker = req.params.ticker.toLowerCase();
    console.log(req.query);

    res.render("stock", { stock: {} });
  } catch (err) {
    console.log(err);
  }
};

const getSpecificStock = async (req, res) => {
  try {
    const symbol = req.query.symbol.toUpperCase();
    const API_KEY = process.env.API_KEY;

    // Company overview
    const overview = await fetchOverview(API_KEY, symbol);

    // Company news
    const news = await fetchNews(API_KEY, symbol);

    // Company Daily Price
    const dailyQuote = await fetchDailyQuote(API_KEY, symbol);

    // const data = {
    //   overview:
    //     Object.keys(response.data).length === 0 ? undefined : response.data,
    //   news: responseNews.data.feed
    //     ? responseNews.data.feed.slice(0, 6)
    //     : undefined,
    //   quote: responseQuote.data["Global Quote"],
    // };

    const data = {
      overview: overview,
      quote: dailyQuote["Global Quote"],
      news: news.feed,
    };
    console.log(data);

    res.render("stocks", { stock: data });
    // res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getStocks: getStocks,
  getSpecificStock: getSpecificStock,
};
