const express = require("express");
const router = express.Router();
const userRouter = require("../operation/router/user");

router.use("/user", userRouter);
module.exports = router;
