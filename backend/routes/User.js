const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, password, passwordVerify } = req.body;

    if (!username || !password || !passwordVerify) {
      return res.status(400).send("Please enter all required fields.");
    }

    if (password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters.");
    }

    if (password !== passwordVerify) {
      return res.status(400).send("Passwords provided were not the same.");
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).send("Account with this username already exists.");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: req.body.username,
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

    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.send().status(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //validate

    if (!username || !password) {
      return res.status(400).send("Please enter all required fields.");
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).send("Wrong username or password.");
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect) {
      return res.status(401).send("Wrong username or password.");
    }

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in an http only cookie!!

    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send(JSON.stringify(token));
  } catch (err) {
    console.log(err);
    res.send().status(500);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
