const http = require("http");
const fs = require("fs")

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} - ${req.url} - req from client\n`
    fs.appendFile('log.txt', log, (err, date) => {
        switch(req.url){
            case '/':
                res.end("This is home");
                break;
            case '/about':
                res.end("this in about");
                break;
            default:
                res.end("404")

        }
    })
});

myServer.listen(8000, () =>{
    console.log("server started");
});