const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
// const fs = require("fs");
// const https = require("https");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import Routes
const authRoute = require("./routes/auth");
const themesRoute = require("./routes/themes");

const app = express();
const port = 3000;

const mongoURL = process.env.NODE_ENV === "production" ? "admin:6zm$fMY9*x5QH54Cm*^Zd8ra@mongo:27017" : "127.0.0.1:27017";

mongoose
  .connect(`mongodb://${mongoURL}/mustap`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

// Middleware
app.use(helmet());
app.use(express.json());

// Route Middlewares
app.use("/auth", authRoute); 
app.use("/themes", themesRoute);

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

app.listen(port, () =>
    console.log(`Server listening at http://localhost:${port}`)
  );
