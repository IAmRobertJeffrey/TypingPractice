const port = process.env.PORT || 4024;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Socket } = require("socket.io");

dotenv.config();

mongoose.connect(process.env.MDB_CONNECT, (err) => 
{
  if (err) 
  {
    return console.log(err);
  } 
  else 
  {
    console.log("connected to mongodb!");
  }
});

const io = require("socket.io")(port, 
  {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let currentUsers = [];
let count = 0;

io.on("connection", (client) => 
{
  try 
  {
    console.log("Client connected.");
    
    client.on("fetchUserData", (data) => {
      existingCheck(client, data);
    });

    client.on("register", async (data) => 
    {
      const yo = await register(client, data);
      client.emit("registerResponse", yo);
      existingCheck(client, yo);
    });

    client.on("login", async (data) => 
    {
      const yo = await login(client, data);
      client.emit("loginResponse", yo);
      console.log(currentUsers);
    });

    client.on("logout", (data) => {
      console.log("token: " + client.handshake.auth.token);
      const user = jwt.decode(
        client.handshake.auth.token,
        process.env.JWT_SECRET
      ).user;
      currentUsers = currentUsers.filter((current) => current !== user);
      client.emit("logoutResponse")
    
    });

    client.on("disconnect", () => 
    {
      if (client.handshake.auth.token) 
      {
        const token = client.handshake.auth.token;
        const user = jwt.decode(token, process.env.JWT_SECRET).user;
        console.log(`Client disconnected: ${user}`);

        currentUsers = currentUsers.filter((current) => current !== user);
      }
      else
      {
        console.log("not logged in on disconnect");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

async function existingCheck(client, token) 
{
  if (token) 
  {
    const existingUser = await User.findById(
      jwt.decode(token, process.env.JWT_SECRET).user
    );
    if (existingUser) 
    {
      if (currentUsers.includes(JSON.parse(JSON.stringify(existingUser._id)))) 
      {
       
        console.log("reconnected");
        currentUsers = currentUsers.filter((current) => current !== existingUser);

        client.emit("getUserData", existingUser.username);
      } 
      else 
      {
        currentUsers.push(JSON.parse(JSON.stringify(existingUser._id)));
        client.emit("getUserData", existingUser.username);
        console.log(existingUser.username);
      }
      console.log(currentUsers);
    }
  } 
  else 
  {
    console.log("not logged in");
    console.log(currentUsers);
  }
}

async function loginCheck(client, token)
{
  if (token) 
  {
    console.log("hi");
    const existingUser = await User.findById(
      jwt.decode(token, process.env.JWT_SECRET).user
    );
    if (existingUser) 
    {
      if (currentUsers.includes(JSON.parse(JSON.stringify(existingUser._id)))) 
      {
        console.log("biggest hi");
        currentUsers = currentUsers.filter((current) => current !== existingUser);
      } 
    }
  } 

}

async function login(client, data) 
{

  loginCheck(client, client.handshake.auth.token)

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
  client.emit("getUserData", existingUser.username);
  currentUsers.push(JSON.parse(JSON.stringify(existingUser._id)));
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

    client.emit("getUserData", savedUser.username);
    currentUsers.push(JSON.parse(JSON.stringify(savedUser._id)));
    return token;
  } catch (err) {
    console.log(err);
    res.send().status(500);
  }
}


