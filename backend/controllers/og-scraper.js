const ogs = require('open-graph-scraper')

//do something with imageURL

const scrapeURL = async (req,res)=>{
    const { providedURL }  = req.body
    if(!providedURL){
        res.status(400)
        res.json({ msg : "No url provided." })
        return
    }
    try{
        const data = await ogs({ url: providedURL })
        const { error, result, response } = data
        if(error){
            res.status(400)
            res.json({ msg:"Unable to retrieve url OG metadata." })
            return
        }
        res.status(200)
        res.json(result)
    }
    catch(error){
        res.status(400)
        res.json({ msg:"Provided URL is not valid." })
        return
    }
}

module.exports = scrapeURL