const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const { v4: uuid } = require("uuid");
// const fs = require("fs");
// const https = require("https");

// if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
  console.log("loaded .env");
// }

// Import Routes
const authRoute = require("./routes/auth");

const app = express();
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

const MONGO_URL =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}`
    : "mongodb://127.0.0.1:27017";

console.log(MONGO_URL)

mongoose
  .connect(`${MONGO_URL}/discord?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

// Middleware
const corsConfig = {
  origin:
    process.env.NODE_ENV === "production"
      ? ""
      : "http://localhost:8080",
  credentials: true,
  methods: ["GET", "POST"]
};

app.use(helmet());
app.use(express.json());
app.use(cors(corsConfig));

// cookieParser
app.use(cookieParser());

// Route Middlewares
app.use("/auth", authRoute);

const history = require("connect-history-api-fallback");

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static("client/dist");

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
app.use(
  history({
    index: "/client/dist/index.html",
  })
);

// 2nd call for redirected requests
app.use(staticFileMiddleware);

const http = require("http").createServer(app);

http.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

const io = require("socket.io")(http, corsConfig);
const validateToken = require("./validation/tokenValidation");
const User = require("./model/User");
const Chats = require("./model/Chats");

io.on("connection", async (socket) => {
  // ON CONNECTION ----------------------

  // Validate jwt
  const tokenData = validateToken(socket.client.request);

  // if jwt is valid then send users info back to them
  // and save their current socket id in the db
  if (!tokenData) return socket.emit("not-authenticated");

  const { userId } = tokenData;

  const data = await User.findOne({ userId })
    .then((doc) => {
      if (doc) {
        return doc;
      } else {
        return null;
      }
    })
    .catch((err) => console.log(err));

  if (data) {
    data.socketId = socket.id;
    data.save().catch((err) => console.log(err));

    socket.emit("authenticated", data);
  } else {
    socket.emit("not-authenticated");
  }

  // ON DISCONNECTION -------------------
  socket.on("disconnect", async () => {
    // Validate jwt
    const tokenData = validateToken(socket.client.request);
    if (!tokenData) return;

    // remove socketId
    const { userId } = tokenData;
    User.findOne({ userId })
      .then((doc) => {
        if (doc) {
          doc.socketId = undefined;
          doc.save().catch(() => null);
        }
      })
      .catch((err) => console.log(err));
  });

  // Add Friend event
  socket.on("add-friend", async ({ username, hash }) => {
    const tokenData = validateToken(socket.client.request);

    if (tokenData === false) {
      socket.emit("invalid-token");
      return;
    }

    const friend = await User.findOne({ username, hash })
      .then((doc) => {
        if (doc) {
          return doc;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
    if (friend && tokenData.userId === friend.userId)
      return socket.emit("add-friend-response", {
        error: true,
        message: "That desperate for a friend are we?",
      });

    if (friend) {
      const user = await User.findOne({ userId: tokenData.userId })
        .then((doc) => {
          if (doc) {
            return doc;
          } else {
            return null;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (user) {
        // check if friend already has a request from user
        if (friend.friendRequests && friend.friendRequests[user.userId]) {
          return socket.emit("add-friend-response", {
            error: true,
            message: "You have already sent a friend request to this user.",
          });
        }

        // check if user already has a request from friend
        if (user.friendRequests && user.friendRequests[friend.userId]) {
          socket.emit("add-friend-response", {
            error: true,
            message: "You already have a friend request from this user.",
          });
          return;
        }

        if (user.friends && user.friends[friend.userId]) {
          socket.emit("add-friend-response", {
            error: true,
            message: "You are already friends with this user.",
          });
          return;
        }

        if (!friend.friendRequests) friend.friendRequests = {};
        // add friend request to doc
        const friendRequests = { ...friend.friendRequests }
        friendRequests[user.userId] = {
          username: user.username,
          hash: user.hash,
          userId: user.userId,
        };
        friend.friendRequests = friendRequests;

        // send alert to friend if they are online
        if (friend.socketId) {
          io.to(friend.socketId).emit("friend-request", friend.friendRequests[user.userId]);
        }

        // save friend doc
        try {
          await friend.save();
          socket.emit("add-friend-response", {
            error: false,
            message: "Friend request sent!",
          });
        } catch (e) {
          console.log(e);
          socket.emit("add-friend-response", {
            error: true,
            message: "Couldn't send friend request at this time.",
          });
        }
      } else {
        socket.emit("add-friend-response", {
          error: true,
          message: "You weren't found in the database! Thats odd...",
        });
      }
    } else {
      socket.emit("add-friend-response", {
        error: true,
        message: "User not found.",
      });
    }
  });

  // Answer friend request
  socket.on("answer-friend-request", async ({ userId: friendUserId, accept }) => {
    const tokenData = validateToken(socket.client.request);

    if (tokenData === false) {
      socket.emit("invalid-token");
      return;
    }

    const user = await User.findOne({ userId: tokenData.userId })
      .then((doc) => {
        if (doc) {
          return doc;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (!user)
      return socket.emit("answer-friend-request-response", {
        error: true,
        message: "You weren't found in the database! Thats odd...",
      });

    let friend;
    if (accept) {
      friend = await User.findOne({ userId: friendUserId })
        .then((doc) => {
          if (doc) {
            return doc;
          } else {
            return null;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (!friend)
        return socket.emit("answer-friend-request-response", {
          error: true,
          message: "User was not found.",
        });
    }

    // delete friend request from user
    const friendRequests = { ...user.friendRequests };
    delete friendRequests[friendUserId];
    user.friendRequests = friendRequests;

    if (accept) {
      if (!user.friends) user.friends = {};
      let friends = { ...user.friends };
      friends[friendUserId] = {
        userId: friend.userId,
        username: friend.username,
        hash: friend.hash,
        initiator: true,
      };
      user.friends = friends;

      if (!friend.friends) friend.friends = {};
      friends = { ...friend.friends };
      friends[user.userId] = {
        userId: user.userId,
        username: user.username,
        hash: user.hash,
        initiator: false,
      };
      friend.friends = friends;

      // save user to db
      // saving each doc must be seperate because otherwise this
      // could result in one doc being saved but the other erroring out
      // this would leave one person with the friend added and one not
      // Basically - DONT PUT THESE INTO THE SAME TRY CATCH BLOCK
      try {
        user.save();
      } catch {
        return socket.emit("answer-friend-request-response", {
          error: true,
          message: "Fatal internal server error occured.",
        });
      }

      // save friend to db
      try {
        friend.save();
      } catch {
        return socket.emit("answer-friend-request-response", {
          error: true,
          message: "Fatal internal server error occured.",
        });
      }

      if (friend.socketId) {
        io.to(friend.socketId).emit("pending-friend-request-accepted", friend.friends[user.userId]);
      }

      return socket.emit("answer-friend-request-response", {
        error: false,
        accepted: true,
        message: "Accepted friend request.",
        friend: {
          userId: friend.userId,
          username: friend.username,
          hash: friend.hash,
          initiator: true,
        },
      });
    } else {
      try {
        await user.save();
      } catch {
        socket.emit("answer-friend-request-response", {
          error: true,
          message: "Fatal internal server error occured.",
        });
      }

      socket.emit("answer-friend-request-response", {
        error: false,
        accepted: false,
        message: "Rejected friend request.",
        friend: {
          userId: friendUserId,
        },
      });
    }
  });

  // REMOVE FRIEND 
  socket.on("remove-friend", async friendUserId => {
    const tokenData = validateToken(socket.client.request);

    if (tokenData === false) {
      socket.emit("invalid-token");
      return;
    }

    const user = await User.findOne({ userId: tokenData.userId })
      .then(async doc => {
        if (doc) {
          try {
            const friends = { ...doc.friends };
            delete friends[friendUserId];
            doc.friends= friends;

            await doc.save();
            return doc
          } catch {
            socket.emit("remove-friend-response", { error: true, message: "Could not remove friend." });
          }
        }
      })
      .catch(() => socket.emit("remove-friend-response", { error: true, message: "Internal server error occurred." }))

    if (!user) return;

    const friend = await User.findOne({ userId: friendUserId })
      .then(async doc => {
        if (doc) {
          try {
            const friends = { ...doc.friends };
            delete friends[tokenData.userId];
            doc.friends = friends;

            await doc.save()
            return doc
          } catch {
            socket.emit("remove-friend-response", { error: true, message: "Could not remove friend." });
          }
        }
      })
      .catch(() => socket.emit("remove-friend-response", { error: true, message: "Internal server error occurred." }))

    if (!friend) return;

    socket.emit("remove-friend-response", { error: false, message: "Removed user from friends list.", userId: friendUserId })
    
    if (friend.socketId) {
      io.to(friend.socketId).emit("remove-friend-response", tokenData.userId)
    }
  });

  async function findChatLogs(from, to) {
    let chatId = from.initiator ? from.userId + to.userId : to.userId + from.userId;
    
    let chat;
    try {
      chat = await Chats.findOne({ chatId });
    } catch {
      return socket.emit("send-message-response", { error: true, message: "Sorry, there was an error finding your chat logs with this user."});
    }

    // TODO: CHANGE THIS TO A PAST FRIENDSHIPS BASED CHECK THAT HAPPENS ON CLIENT SIDE
    // AS THIS WILL RESULT IN LESS DB HITS
    // if there is no chat logs for these check if chat exists from previous friendship
    if (!chat) {
      chatId = !from.initiator ? from.userId + to.userId : to.userId + from.userId;

      try {
        chat = await Chats.findOne({ chatId })
      } catch {
        return socket.emit("send-message-response", { error: true, message: "Sorry, there was an error finding your chat logs with this user."});  
      }
      
      // if there is still no chat then create it
      if (!chat) {
        chat = await Chats.create({ chatId });
      }
    }

    return { chat, chatId }
  }

  socket.on("send-message", async ({ from, to, message }) => {
    const { chat, chatId } = await findChatLogs(from, to);

    // create message
    const msgTimestamp = new Date().getTime();
    const msg = { 
      text: message, 
      timestamp: msgTimestamp, 
      userId: from.userId, 
      id: uuid().slice(0, 16) 
    };

    // append new message and save doc to db
    chat.messages.push(msg);
    chat.save();

    // send message back to sender
    socket.emit("receive-message", { ...msg, chatId });
    
    // send message to recipitent if they are online
    const recipient = await User.findOne({ userId: to.userId });
    if (recipient && recipient.socketId)
      io.to(recipient.socketId).emit("receive-message", { ...msg, chatId });
  })

  socket.on("fetch-messages", async ({ from, to }) => {
    const { chat, chatId } = await findChatLogs(from, to);

    if (chat) return socket.emit("fetch-messages-response", { error: false, messages: { chatId, logs: chat.messages } });
  });
});
