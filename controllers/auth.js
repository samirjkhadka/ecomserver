const { validationResult } = require("express-validator");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
exports.register = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return res.status(400).json({ errors: errorMessage });
  }
  try {
    let user = new User({
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
    });
    user = await user.save();

    if (!user) {
      return res.status(500).json({
        type: "Internal Server Error",
        message: "Something went wrong, Couldn't create a new user",
      });
    }
    return res.status(201).json({ user });
  } catch (error) {
    if (error.message.includes("email_1 dup key")) {
      return res
        .status(409)
        .json({
          type: "AuthError",
          message: "User with the email already exists",
        });
    }
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.login = async function (req, res) {
  res.send("register");
};

exports.forgotPassword = async function (req, res) {
  res.send("register");
};

exports.verifyPasswordResetOTP = async function (req, res) {
  res.send("register");
};

exports.resetPassword = async function (req, res) {
  res.send("register");
};
