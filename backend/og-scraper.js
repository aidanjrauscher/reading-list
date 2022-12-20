const ogs = require('open-graph-scraper')


const scrape = async (url)=>{
    const data = await ogs({ url: url })
    const { error, result, response } = data
    console.log('result:', result) 
}

scrape('https://dev.to/itsrakesh/different-ways-to-connect-react-frontend-and-node-backend-1pik')