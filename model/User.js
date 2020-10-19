const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        min: 36,
        max: 36
    },
    displayName: {
        type: String,
        required: true,
        min: 1,
        max: 64
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
        max: 1024
    }
})

module.exports = mongoose.model("User", userSchema, "users");