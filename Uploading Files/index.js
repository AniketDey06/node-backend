import path from 'path'
import express from 'express'
import multer from 'multer'

const app = express()
const PORT = process.env.PORT || 8000

// const upload = multer({ dest: "uploads/"})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    return res.render("home.ejs")
})

app.post('/upload', upload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})

app.listen(PORT, () => console.log(`server started at ${PORT}`))