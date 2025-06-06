import path from 'path'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 8000

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json())

app.get("/", (req, res) => {
    return res.render("home.ejs")
})

app.listen(PORT, () => console.log(`server started at ${PORT}`))