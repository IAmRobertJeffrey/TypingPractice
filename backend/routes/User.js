const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
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

    //log them in after registering
  } catch (err) {
    console.log(err);
    res.send().status(500);
  }
});

module.exports = router;
