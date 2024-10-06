const { Schema, model } = require("mongoose");

const userSchema =  Schema({
  name: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  street: String,
  apartment: String,
  city: String,
  postalCode: String,
  country: String,
  phone: { type: String, required: true, trim: true },
  resetPasswordOtp: Number,
  resetPasswordOtpExpiration: Date,
  isAdmin: { type: Boolean, default: false },

  wishList: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productImage: { type: String, required: true },
      productPrice: { type: String, required: true },
    },
  ],
});

userSchema.index({ email: 1 }, { unique: true });
exports.User = model('User', userSchema);


