const fs = require("fs");

//sync call
// fs.writeFileSync('./test.txt', "hi hello")

//async call
// fs.writeFile("./test.txt", "hello from async", (err) => {})

//read sync
// const res = fs.readFileSync("./test.txt", "utf-8");
// console.log(res);

//read async
// fs.readFile("test.txt", "utf-8", (err, res) => {
//     if(err){
//         console.log("err:", err);
//     }else{
//         console.log(res);
//     }
// });

fs.appendFileSync("./test.txt", `${Date.now()}hey there \n`);

// fs.cpSync("./test.txt", "./copy.txt");

fs.unlinkSync("./copy.txt");