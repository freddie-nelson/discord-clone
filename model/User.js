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
    hash: {
        type: String,
        default: () => {
            return String(Math.floor(Math.random() * 10000)).padStart(4, "0");
        },
        required: true,
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
    },
    friends: {
        type: Object,
        required: false
    },
    friendRequests: {
        type: Object,
        required: false
    },
    socketId: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("User", userSchema, "users");