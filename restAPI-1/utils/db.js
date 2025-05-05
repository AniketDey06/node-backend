const mongoose = require("mongoose"); 

async function connectMongoDb(url) {
    return mongoose.connect(url).then(() => console.log("DB connect"));
}

module.exports = {
    connectMongoDb,
}
