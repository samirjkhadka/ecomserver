const { validationResult } = require("express-validator");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Token } = require("../models/authToken");
require("dotenv/config");
const env = process.env;
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
      return res.status(409).json({
        type: "AuthError",
        message: "User with the email already exists",
      });
    }
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        type: "AuthError",
        message: "User with the email doesn't exist",
      });
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({
        type: "AuthError",
        message: "Incorrect password",
      });
    }



    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const token = await Token.findOne({ userId: user.id });


    if (token) await token.deleteOne();
    await new Token({
      userId: user.id,
      accessToken,
      refreshToken,
    }).save();

    user.passwordHash = undefined;
    return res.json({ ...user._doc, accessToken });
  } catch (error) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
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
