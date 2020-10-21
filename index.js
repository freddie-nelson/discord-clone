const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
// const fs = require("fs");
// const https = require("https");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import Routes
const authRoute = require("./routes/auth");

const app = express();
const port = process.env.NODE_ENV === "production" ? 3000 : 3000;

const mongoURL =
  process.env.NODE_ENV === "production" ? "admin:6zm$fMY9*x5QH54Cm*^Zd8ra@mongo:27017" : "127.0.0.1:27017";

mongoose
  .connect(`mongodb://${mongoURL}/discord`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

// Route Middlewares
app.use("/auth", authRoute);

// cookieParser
app.use(cookieParser());

// https
//   .createServer(
//     {
//       key: fs.readFileSync("./server.key"),
//       cert: fs.readFileSync("./server.cert")
//     },
//     app
//   )
//   .listen(port, () =>
//     console.log(`Server listening at https://localhost:${port}`)
//   );

const http = require("http").createServer(app);

http.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

const io = require("socket.io")(http);
const validateToken = require("./validation/tokenValidation");
const User = require("./model/User");

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

    if (tokenData.userId === friend.userId)
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
          console.log(error);
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
          console.log(error);
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
});
