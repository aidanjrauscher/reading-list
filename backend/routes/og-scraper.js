const express = require("express")
const scrapeURL = require("../controllers/og-scraper")

const router = express.Router()

router.route("/").post(scrapeURL)

module.exports = router