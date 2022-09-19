const searchEndpoint = require("./api/search");

const getSearch = async (req, res) => {
  console.log("redirected");
  // const result = await searchEndpoint();

  // res.render("index", { result: result });
  // const data = { name: "hef" };
  res.render("search");
};

const postSearch = async (req, res) => {
  const userSearchString = req.body.payload;
  const API_KEY = process.env.API_KEY;

  const result = await searchEndpoint(userSearchString, API_KEY);

  res.status(200).json(result);
};

module.exports = {
  getSearch: getSearch,
  postSearch: postSearch,
};
