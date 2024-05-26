const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

// endpoint for register
router.post('/', userController.createUser);

router.post('/login', userController.loginWithEmail);

module.exports = router;