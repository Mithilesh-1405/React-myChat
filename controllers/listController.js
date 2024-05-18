const List = require("../models/list");

exports.createList = async (req, res) => {
  const { title, customProperties } = req.body;
  console.log(title);
  try {
    const newList = new List({ title, customProperties });
    await newList.save();
    res.status(201).json({ status: "success", listId: newList._id });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
