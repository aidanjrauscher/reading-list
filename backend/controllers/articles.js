const prisma = require("../utils/prismaClient")
const validURL = require("../utils/urlChecker")

const getArticles = async (req,res)=>{
    try{
        const {favorite, read} = req.query
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

const updateArticle = async(req,res)=>{
    let {articleID} = req.params
    const {favorite, read} = req.body
    articleID = Number(articleID)
    if(articleID == NaN){
        req.status(400)
        req.json({ msg: "Provided article id is invalid." })
        return
    }
    let data = {}
    if(favorite){
        data.isFavorite = favorite == "true" ? true : false
    }   
    if(read){
        data.isRead = read == "true" ? true : false
    }
    try{
        const article = await prisma.article.update({
            where:{
                id: articleID,
            }, 
            data : data
        })
        res.status(200)
        res.json(article)
    }
    catch(error){
        if(error.meta.cause == 'Record to update not found.'){
            res.status(404)
        }
        else{
            res.status(400)
        }
        res.json({ msg: "Unable to update article." })
    }

}

const addArticle = async (req,res)=>{
    const { url, imageURL, title, description, read, favorite} = req.body
    if(!url || !imageURL || !title){
        res.status(400)
        res.json({ msg: "Must provide url, imageURL, and title." })
        return
    }
    if(!validURL(url) || !validURL(imageURL)){
        res.status(400)
        res.json({ msg: "Must provide valid urls for url and imageURL." })
        return
    }
    const data = {}
    data.url = url 
    data.imageURL = imageURL
    data.title = title
    data.description = description 
    if(favorite){
        data.isFavorite = favorite == "true" ? true : false
    }   
    if(read){
        data.isRead = read == "true" ? true : false
    }
    try{
        const article = await prisma.article.findFirst({ where: {
            url: data.url
        }})
        if(article){
            res.status(400)
            res.json({ msg: "Article already exists in reading list." })
            return
        }
        const newArticle = await prisma.article.create({ data: data })
        res.status(200)
        res.json(newArticle)
    }
    catch(error){
        res.status(400)
        res.json({ msg: "Unable to create article." })
    }
}

const deleteArticle = async (req,res)=>{
    let {articleID} = req.params
    articleID = Number(articleID)
    if(articleID == NaN){
        req.status(400)
        req.json({ msg: "Provided article id is invalid." })
        return
    }
    try{
        const article = await prisma.article.delete({
            where: {
                id: articleID
            }
        })
        res.status(200)
        res.json(article)
    }
    catch(error){
        res.status(400)
        res.json({ msg: "Unable to delete article." })
    }
}

module.exports = {
    getArticles,
    getSingleArticle,
    updateArticle,
    addArticle,
    deleteArticle
}