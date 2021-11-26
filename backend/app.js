const port = process.env.PORT || 4024;
const cors = require("cors");
const express = require("express");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("cookie-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("./passportConfig")(passport);
dotenv.config();


const app = express();

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

app.use(cors({
	origin: "https://roberts-typing.web.app",
	credentials: true,
	exposedHeaders: {
		"Access-Control-Allow-Origin": "*"
	}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: process.env.JWT_SECRET,
	resave: true,
	saveUninitialized: true,
}));

app.use(cookieParser(process.env.JWT_SECRET));

app.use(passport.initialize());
app.use(passport.session());


app.post("/login", (req, res, next) =>
{
	passport.authenticate("local", (err, user, info) =>
	{
		if (err)
		{
			throw err;
		}
		if (!user)
		{
			res.send("No user exists");
		}
		else
		{
			req.logIn(user, err =>
			{
				if (err)
				{
					throw err;
				}
				res.send("Successfully authenticated!");
				console.log(req.user);
			});
		}
	})(req, res, next);
});

app.post("/register", (req, res) =>
{
	User.findOne({ username: req.body.username }, async (err, doc) =>
	{
		if (err)
		{
			throw err;
		}
		if (doc)
		{
			res.send("user already exists");
		}
		if (!doc)
		{
			const salt = await bcrypt.genSalt();
			const passwordHash = await bcrypt.hash(req.body.password, salt);

			const newUser = new User({
				username: req.body.username,
				password: passwordHash
			});
			await newUser.save();
			req.logIn(newUser, err =>
			{
				if (err)
				{
					throw err;
				}
				res.send("Successfully authenticated!");
				console.log(req.user);
			});
		}
	});
});

app.get("/user", (req, res) =>
{
	res.send(req.user);
	console.log("HELP");
});

app.get("/logout", function (req, res)
{
	req.logout();
	res.send();
});

app.listen(port, () =>
{
	console.log("Express server is now on port " + port);
});


