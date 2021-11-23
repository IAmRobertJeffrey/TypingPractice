const express = require("express");
const http = require("http");
const port = process.env.PORT || 4024;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use("/auth", require("./routes/User"));
app.use("/game", require("./routes/Game"));

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  socket.conn.transport.once("headers", (headers) => {
    headers["set-cookie"] = "sess=test;";
  });

  next();
});

mongoose.connect(process.env.MDB_CONNECT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("connected to mongodb!");
  }
});

io.on("connection", (client) => {
  console.log("Client connected.");

  client.on("word", (data) => {
    console.log(data);
  });

  client.on("match", (data) => {
    console.log(data);
  });

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
