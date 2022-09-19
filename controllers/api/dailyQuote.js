const axios = require("axios");

const fetchDailyQuote = async (apikey, symbol) => {
  const endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`;

  const response = await axios.get(endpoint);

  return response.data;
};

module.exports = fetchDailyQuote;
