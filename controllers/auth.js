const {validationResult} = require("express-validator");

exports.register = async function (req, res)  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

exports.login = async function (req, res)  {
    res.send("register");
};

exports.forgotPassword = async function (req, res)  {
    res.send("register");
};

exports.verifyPasswordResetOTP = async function (req, res)  {
    res.send("register");
};

exports.resetPassword = async function (req, res)  {
    res.send("register");
};