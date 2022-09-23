const axios = require("axios");

const fetchNews = async (apikey, symbol) => {
  const endpoint = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&limit=10&apikey=${apikey}`;

  const response = await axios.get(endpoint);

  // console.log(response.data);
  return response.data.items == "0" ? undefined : response.data;
};

module.exports = fetchNews;
