const express = require("express");
const router = express.Router();
const userModel = require("../model/user");
const BcryptService = require("../../library/brcypt");
const upload = require("../../library/multer");
const userMapper = require("../mapper/user");
const JwtServices = require("../../library/jwt");
const Controller = require("../controller/user");

router.get("/get-all-users", Controller.getAllUsers);

router.post("/create", upload.single("image"), Controller.CreateUser);
router.get("/:id", Controller.GetUserById);
router.put("/edit/:id", Controller.UpadateById);
router.delete("/delete/:id", Controller.DeleteById);

router.post("/login", Controller.Login);

router.post("/check-token", Controller.CheckToken);

module.exports = router;
