const http = require("http");
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()} - ${req.url} - req from client\n`
    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);
    fs.appendFile('log.txt', log, (err, date) => {
        switch(myUrl.pathname){
            case '/':
                res.end("This is home");
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end("here are your resuls for - " + search)
                break;
            default:
                res.end("404")

        }
    })
});

myServer.listen(8000, () =>{
    console.log("server started");
});