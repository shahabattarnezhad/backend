const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The username is required."],
    },
    email: {
      type: String,
      required: [true, "The email address is required."],
      unique: [true, "This email is already taken."],
    },
    password: {
      type: String,
      required: [true, "The password is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
