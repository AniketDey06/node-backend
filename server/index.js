const http = require("http");
// const fs = require("fs")
// const url = require("url")
const express = require("express")

const app = express();

app.get("/", (req, res) => {
    return res.send("this is home");
})

app.get("/about", (req, res) => {
    return res.send("this is about, hi " + req.query.name)
})

app.listen(8000, () => {
    console.log("server started");
})

// const myServer = http.createServer(app);

// myServer.listen(8000, () =>{
//     console.log("server started");
// });