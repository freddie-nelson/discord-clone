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

const mongoURL = process.env.NODE_ENV === "production" ? "admin:6zm$fMY9*x5QH54Cm*^Zd8ra@mongo:27017" : "127.0.0.1:27017";

mongoose
  .connect(`mongodb://${mongoURL}/discord`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

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

http.listen(port, () =>
    console.log(`Server listening at http://localhost:${port}`)
  );

const io = require("socket.io")(http);
const validateToken = require("./validation/tokenValidation");
const User = require("./model/User");

io.on("connection", async socket => {
  console.log("a user connected");

  // Validate jwt
  const tokenData = validateToken(socket.client.request);

  // if jwt is valid then send users info back to them
  // and save their current socket id in the db
  if (tokenData !== false) {
    const User = require("./model/User");
    const { userId } = tokenData;

    const data = await User.findOne({ userId })
      .then(doc => {
        if (doc) {
          return doc;
        } else {
          return null;
        }
      })
      .catch(err => console.log(err));

    if (data) {
      data.socketId = socket.id;
      data.save()
        .catch(err => console.log(err));

      socket.emit("authenticated", data)
    }
  } else {
    socket.emit("not-authenticated")
  }

  // Add Friend event
  socket.on("add-friend", async ({ username, hash }) => {
    const tokenData = validateToken(socket.client.request);

    if (tokenData === false) {
      socket.emit("invalid-token");
      return;
    }
    
    const friend = await User.findOne({ username, hash })
      .then(doc => {
        if (doc) {
          return doc;
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
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
        for (const request of friend.friendRequests) {
          if (request.userId === user.userId) {
            socket.emit("add-friend-response", { error: true, message: "User already has a friend request from you." })
            return;
          }
        }
        
        // check if user already has a request from friend
        for (const request of user.friendRequests) {
          if (request.userId === friend.userId) {
            socket.emit("add-friend-response", { error: true, message: "You already have a friend request from this user." })
            return;
          }
        }

        friend.friendRequests.push({
          username: user.username,
          hash: user.hash,
          userId: user.userId
        });

        // send alert to friend if they are online
        if (friend.socketId) {
          io.to(friend.socketId).emit("friend-request", friend.friendRequests[friend.friendRequests.length - 1]);  
        }
        
        // save friend doc
        try {
          await friend.save();
          socket.emit("add-friend-response", { error: false, message: "Friend request sent!" });  
        } catch (e) {
          console.log(e);
          socket.emit("add-friend-response", { error: true, message: "Couldn't send friend request at this time." });
        }
      } else {
        socket.emit("add-friend-response", { error: true, message: "You weren't found in the database! Thats odd..." });
      }
    } else {
      socket.emit("add-friend-response", { error: true, message: "User not found." })
    }
  })

  socket.on("disconnect", async () => {
    console.log("user disconnected");
  });
})
