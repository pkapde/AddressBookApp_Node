const express = require('express');
const controller = require('../controller/userController');
const auth = require('../middlewares/auth')
const router = express.Router();

router.post("/users/register",controller.registerUser)

router.post("/users/login",controller.loginUser)

router.post("/users/addContact", auth.checkToken, controller.addContact);

router.get("/users/getAll", auth.checkToken, controller.getContacts);

router.post("/users/update", auth.checkToken, controller.updateContact);

router.delete("/remove/:userEmail", auth.checkToken, controller.deleteContact);

module.exports = router;