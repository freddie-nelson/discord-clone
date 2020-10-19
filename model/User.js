const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        min: 16,
        max: 16
    },
    username: {
        type: String,
        required: true,
        min: 1,
        max: 28
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 320
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 256
    }
})

module.exports = mongoose.model("User", userSchema, "users");