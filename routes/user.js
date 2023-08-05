const express = require("express");
const router = express.Router();

const { signin, signup, getUser } = require("../controllers/user.js");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUser", getUser);

module.exports = router;