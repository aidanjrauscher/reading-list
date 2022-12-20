const prisma = require("../utils/prismaClient")

const getArticles = async (req,res)=>{
    try{
        const {favorite, read} = req.query
        console.log(favorite)
        const articles = await prisma.article.findMany()
        res.status(200)
        res.json(articles)
    }
    catch(error){
        res.status(400)
        res.json({ msg: "Unable to get articles." })
    }
}

const getSingleArticle = async (req,res)=>{
    try{
        let {articleID} = req.params
        articleID = Number(articleID)
        if(!articleID){
            res.status(400)
            res.json({ msg: "Invalid article id." })
            return
        }
        const article = await prisma.article.findUnique({
            where: {
                id: articleID,
            },
        })
        if(!article){
            res.status(404)
            res.json({ msg: "Article with provided id does not exist." })
            return
        }
        res.status(200)
        res.json(article)
    }
    catch(error){
        res.status(400)
        res.json({ msg: "Unable to get article." })
    }
}

const updateArticle = async(req,res)=>{}

const addArticle = async (req,res)=>{
}

const deleteArticle = async (req,res)=>{}

module.exports = {
    getArticles,
    getSingleArticle,
    updateArticle,
    addArticle,
    deleteArticle
}