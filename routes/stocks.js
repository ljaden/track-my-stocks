const express = require("express");
const router = express.Router();

const { getSearch, postSearch } = require("../controllers/search");
const { getStocks, getSpecificStock } = require("../controllers/stocks");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, getSearch);
router.post("/", postSearch);

router.get("/ticker", ensureAuth, getSpecificStock);

module.exports = router;
