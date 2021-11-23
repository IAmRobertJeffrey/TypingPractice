const router = require("express").Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  console.log("hi");
  return res.send("hi");
});

module.exports = router;
