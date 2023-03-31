const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "The name is required."],
    },
    email: {
      type: String,
      required: [true, "The email is required."],
    },
    phone: {
      type: String,
      required: [true, "The phone is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
