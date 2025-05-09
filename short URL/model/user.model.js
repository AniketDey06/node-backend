const mongoose = require('mongoose');

const userSuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const UserShU = mongoose.model('userShU', userSuSchema)

module.exports = UserShU