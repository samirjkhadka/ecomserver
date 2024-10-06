const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

const { body } = require("express-validator");
const validateUser = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isStrongPassword()
    .withMessage("Password must be strong"),
  body("phone").isMobilePhone().withMessage("Phone number is invalid"),
];

router.post("/login", authController.login);
router.post("/register",validateUser, authController.register);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyPasswordResetOTP);
router.post("/reset-password", authController.resetPassword);
// router.post("/logout", authController.logout);

module.exports = router;
