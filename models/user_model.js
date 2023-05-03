const mongoose = require("mongoose");
const user = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please add the user name"],
    },
    email: {
      type: String,
      require: [true, "Please add the email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      require: [true, "Please add user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("testuser", user);
