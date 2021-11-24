const express = require("express");
const http = require("http");
const port = process.env.PORT || 4024;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Origin",
    "*"
  );
  next();
});
app.use(cors());
// app.use("/auth", require("./routes/User"));
// app.use("/game", require("./routes/Game"));

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

let currentUsers = [];
let count = 0;

io.on("connection", (client) => {
  try {
    console.log("Client connected.");

    async function existingCheck() {
      if (client.handshake.auth.token) {
        const token = JSON.parse(client.handshake.auth.token);
        const existingUser = await User.findById(
          jwt.decode(token, process.env.JWT_SECRET).user
        );
        if (existingUser) {
          currentUsers.push(
            jwt.decode(existingUser._id, process.env.JWT_SECRET)
          );
        }
      }
    }

    existingCheck();

    client.on("register", async (data) => {
      const yo = await register(client, data);
      console.log(yo);
      client.emit("registerResponse", yo);
      currentUsers.push(
        jwt.decode(
          JSON.parse(client.handshake.auth.token).user,
          process.env.JWT_SECRET
        )
      );
    });

    client.on("login", async (data) => {
      const yo = await login(client, data);
      client.emit("loginResponse", yo);
      currentUsers.push(
        jwt.decode(
          JSON.parse(client.handshake.auth.token),
          process.env.JWT_SECRET
        )
      );
      console.log(
        jwt.decode(
          JSON.parse(client.handshake.auth.token),
          process.env.JWT_SECRET
        ).user
      );
      // console.log(
      //   jwt.decode(
      //     JSON.parse(client.handshake.auth.token).user,
      //     process.env.JWT_SECRET
      //   )
      // );
    });

    client.on("disconnect", () => {
      console.log("Client disconnected");
      currentUsers = currentUsers.filter(
        (current) =>
          current !==
          jwt.decode(
            JSON.parse(client.handshake.auth.token).user,
            process.env.JWT_SECRET
          )
      );
    });
  } catch (err) {
    console.log(err);
  }
});

async function login(client, data) {
  const { username, password } = data;

  const existingUser = await User.findOne({ username: username });
  if (!existingUser) {
    return "";
  }

  const passwordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!passwordCorrect) {
    return "";
  }

  const token = jwt.sign(
    {
      user: existingUser._id,
    },
    process.env.JWT_SECRET
  );

  // send the token in an http only cookie!!
  console.log(existingUser._id.toString());
  client.emit(token);
  return token;
}

async function register(client, data) {
  try {
    const { username, password, passwordVerify } = data;

    if (!username || !password || !passwordVerify) {
      return { response: "Please enter all required fields." };
    }

    if (password.length < 6) {
      return { response: "Password must be at least 6 characters." };
    }

    if (password !== passwordVerify) {
      return { response: "Passwords provided were not the same." };
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return { response: "Account with this username already exists." };
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    //sign the token
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in an http only cookie!!

    return token;
  } catch (err) {
    console.log(err);
    res.send().status(500);
  }
}

server.listen(port, () => console.log(`Listening on port ${port}`));
