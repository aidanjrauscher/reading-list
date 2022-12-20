const express = require("express")
const {
    getArticles,
    getSingleArticle,
    updateArticle,
    addArticle,
    deleteArticle
} = require("../controllers/articles")

const router = express.Router()

router.route("/").get(getArticles).post(addArticle)

router.route("/:articleID").get(getSingleArticle).patch(updateArticle).delete(deleteArticle)

module.exports = router