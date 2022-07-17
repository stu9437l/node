const userModel = require("../model/user");
const BcryptService = require("../../library/brcypt");
const userMapper = require("../mapper/user");
const JwtServices = require("../../library/jwt");
const getAllUsers = async (req, res, next) => {
  try {
    const allusers = await userModel.find();
    if (!allusers) {
      return next({
        message: "No users are available",
        status: 404,
      });
    }
    res.json(allusers);
  } catch (err) {
    console.log(err);
    next({
      message: "error form find all users",
      status: 500,
    });
  }
};

const CreateUser = async (req, res, next) => {
  try {
    let { password } = req.body;
    if (req.file) {
      req.body.image = req.file.filename;
    }
    if (req.files) {
      let file = [];
      req.files.map((single_file) => {
        file.push(single_file.filename);
      });
      req.body.image = file;
    }
    let hassedPaswsword = await BcryptService.hashPassword(password);
    req.body.password = hassedPaswsword;
    const model = new userModel({});
    userMapper(model, req.body);
    const savedUser = await model.save();
    res.json(savedUser);
  } catch (err) {
    next({
      message: "error from create",
      status: 500,
    });
  }
};
const GetUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    const singleUser = await userModel.findById(id);
    if (!singleUser) {
      next({
        message: "user is not exist",
        status: "404",
      });
    }
    res.json(singleUser);
  } catch (err) {
    next({
      message: "error from get single user",
      status: 500,
    });
  }
};
const UpadateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleUser = await userModel.findById(id);
    if (!singleUser) {
      next({
        message: "user is not exist",
        status: 400,
      });
    }
    userMapper(singleUser, req.body);
    const updated_User = await singleUser.save();
    res.json(updated_User);
  } catch (err) {
    next({
      message: "message from pust method",
      status: 500,
    });
  }
};
const DeleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleUser = await userModel.findById(id);
    if (!singleUser) {
      next({
        message: "user is not exist",
        status: 404,
      });
    }
    const deleted_user = await singleUser.delete();
    res.json(deleted_user);
  } catch (err) {
    next({
      message: "error from delete user by id",
      status: 500,
    });
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailVerify = await userModel.findOne({ email: email });
    if (!emailVerify) {
      next({
        message: "user email is not exist",
        status: 404,
      });
    }
    const previousPassword = emailVerify.password;
    const verifyPassword = await BcryptService.checkPassword(
      password,
      previousPassword
    );
    if (!verifyPassword) {
      next({
        message: "password is not matched",
        status: 400,
      });
    }
    const id = emailVerify._id;
    const token = JwtServices.TokenGenerate(id, "3d");
    res.json({
      token: token,
      data: emailVerify,
    });
  } catch (err) {
    console.log(err);
    next({
      message: "error form login controller",
      status: 500,
    });
  }
};

const CheckToken = async (req, res, next) => {
  try {
    const token = req.headers.auth_token;
    const verifyToken = JwtServices.TokenVerify(token);

    if (!verifyToken) {
      next({
        message: "token not found",
        status: 400,
      });
    } else {
      const exitingUser = await userModel.findById(verifyToken.id);
      res.json(exitingUser);
    }
  } catch (err) {
    next({
      message: "error from token verify controller",
      status: 500,
    });
  }
};
const Controller = {
  getAllUsers,
  CreateUser,
  GetUserById,
  UpadateById,
  DeleteById,
  Login,
  CheckToken,
};

module.exports = Controller;
