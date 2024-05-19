const User = require('../models/user');
const List = require('../models/list');


//Unsubscribing user by getting the listId and userId
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

        //Unsubscribing user by setting the unscubsribed property to true and saving it in database
        user.unsubscribed = true;
        await user.save();

        res.json({ status: 'success', message: 'User unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
