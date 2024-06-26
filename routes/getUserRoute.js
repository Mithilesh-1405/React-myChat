const express = require('express');
const router = express.Router();

const getUserController = require('../controllers/getUserController')

router.get('/show/:listId', getUserController.displayUsers)
module.exports = router;