

const validURL = (string)=>{
    try{
        return Boolean(new URL(string))
    }
    catch(error){
        return false
    }
}

module.exports = validURL
