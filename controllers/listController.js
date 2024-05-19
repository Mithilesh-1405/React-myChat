const List = require("../models/list");


//Creating a new list with title and custom Properties
exports.createList = async (req, res) => {
  const { title, customProperties } = req.body;
  try {
    const newList = new List({ title, customProperties });
    await newList.save();
    res.status(201).json({ status: "success", listId: newList._id, listName : newList.title});
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
