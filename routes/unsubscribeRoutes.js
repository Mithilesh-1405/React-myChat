const express = require('express');
const router = express.Router();

const unsubscribeController = require('../controllers/unsubscribeController');

router.post('/:listId/:userId', unsubscribeController.unsubscribeUser);

module.exports = router;
