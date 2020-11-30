const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    min: 32,
    max: 32,
  },
  messages: {
    type: Array,
    default: new Array()
  }
});

module.exports = mongoose.model("Chat", chatSchema, "chats");
