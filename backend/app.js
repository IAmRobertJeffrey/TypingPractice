const express = require("express");
const http = require("http");
const index = require("./routes/index");
const port = process.env.PORT || 4024;
const app = express();

app.use(index);
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
