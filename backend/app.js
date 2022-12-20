require("dotenv")
const express = require("express")

const articlesRouter = require("./routes/articles")

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())


app.use("/api/articles", articlesRouter)

app.listen(PORT, ()=>{
    console.log(`app listening on port http://localhost:${PORT}`)
})