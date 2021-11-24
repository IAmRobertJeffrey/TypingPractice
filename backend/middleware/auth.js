const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.body.token;
    console.log(req.body.token);
    if (!token) {
      return res.status(401).json({ response: "Unauthorized" });
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified.user;
      return res.send({ response: "Authorized" }).status(200);
    }
  } catch (err) {
    res.status(401).json({ errorMessage: err });
    console.log(err);
  }
}

module.exports = auth;
