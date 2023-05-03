const Contect = require("../models/contectModel");

const createPost = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.send("All fields are required");
  }

  const contect = await Contect.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contect);
};

const getPost = async (req, res) => {
  try {
    const search = req.query;
    const filter = {
      user_id: req.user.id,
    };
    Object.keys(search).forEach((key) => {
      filter[key] = { $regex: new RegExp(search[key], "i") };
    });
    const contect = await Contect.find(filter).lean();
    const count = await Contect.countDocuments(filter);
    res.status(201).json({ count, contect });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
module.exports = { createPost, getPost };
