const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// @desc Register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const existeUser = await User.findOne({ email });

  if (existeUser) {
    res.status(400);
    throw new Error("This email address is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const registeredUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (registeredUser) {
    res
      .status(201)
      .json({ _id: registeredUser.id, email: registeredUser.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid.");
  }
});

// @desc Login the user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const existUser = await User.findOne({ email });

  if (existUser && (await bcrypt.compare(password, existUser.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: existUser.username,
          email: existUser.email,
          id: existUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is incorrect.");
  }
});

// @desc Current user
// @route GET /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
