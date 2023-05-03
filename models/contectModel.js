const { default: mongoose } = require("mongoose");

const contectModel = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "testuser",
    },
    name: {
      type: String,
      required: [true, "Please add the contect name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contect email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contect phone number"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("contectModel", contectModel);
