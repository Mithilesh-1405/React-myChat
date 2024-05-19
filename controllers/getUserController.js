const User = require("../models/user");
const List = require("../models/list");

exports.displayUsers = async (req, res) => {
    try {
        const listId = req.params.listId;
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ status: "error", message: "List not found" });
        }

        const users = await User.find({ listId });
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}