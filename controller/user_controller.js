const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username, !email, !password)) {
    res.status(400);
  }
  const available = await User.findOne({ email });
  if (available) {
    res.status(400);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  res.json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.SECRATE_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ accessToken });
  } else {
    return res.status(401).json("Invalid email or password");
  }
};

const revokedTokens = new Set();

const logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  revokedTokens.add(token);
  res.json({ message: "Logout Successfully" });
};
module.exports = { getUser, registerUser, login, logout, revokedTokens };
