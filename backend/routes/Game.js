const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    console.log("you're in!");
    return res.send("you're in!!");
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

module.exports = router;
