const mongoose = require('mongoose');

async function conenectToMongiDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    conenectToMongiDB,
}