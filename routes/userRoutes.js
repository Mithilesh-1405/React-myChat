const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const userController = require("../controllers/userController");

router.post("/add/:listId", upload.single("file"), userController.addUsers);

module.exports = router;
