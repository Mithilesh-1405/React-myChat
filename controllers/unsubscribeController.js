const User = require('../models/user');
const List = require('../models/list');

exports.unsubscribeUser = async (req, res) => {
    const { listId, userId } = req.params;
    console.log(listId, userId)
    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ status: 'error', message: 'List not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        user.unsubscribed = true;
        await user.save();

        res.json({ status: 'success', message: 'User unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
