const axios = require("axios");

const searchEndpoint = async (payload, API) => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${payload}&apikey=${API}`;

  try {
    const response = await axios.get(url);

    // console.log(response.data);

    const searchResult = response.data;

    return searchResult["bestMatches"].length < 4
      ? searchResult["bestMatches"]
      : searchResult["bestMatches"].slice(0, 4);

    // res.json(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = searchEndpoint;
