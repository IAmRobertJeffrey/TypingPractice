const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified.user;
      return res.send("Authorized").status(200);
    }
  } catch (err) {
    res.status(401).json({ errorMessage: "Unauthorized" });
    console.log(err);
  }
}

module.exports = auth;
