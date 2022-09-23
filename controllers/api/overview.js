const axios = require("axios");

const fetchOverview = async (apikey, symbol) => {
  const endpoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;

  const response = await axios.get(endpoint);

  return Object.keys(response.data).length == 0 ? undefined : response.data;
  // return response.data;
};

module.exports = fetchOverview;
