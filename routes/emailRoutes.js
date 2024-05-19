const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-email/:listId', emailController.sendEmails);

module.exports = router;