const express = require("express");
const http = require("http");
const port = process.env.PORT || 4024;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
app.use("/auth", require("./routes/User"));

mongoose.connect(process.env.MDB_CONNECT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("connected to mongodb!");
  }
});

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
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
