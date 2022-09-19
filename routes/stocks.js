const express = require("express");
const router = express.Router();

const { getSearch, postSearch } = require("../controllers/search");

const { getStocks, getSpecificStock } = require("../controllers/stocks");

router.get("/", getSearch);
router.post("/", postSearch);

router.get("/ticker", getSpecificStock);

module.exports = router;
