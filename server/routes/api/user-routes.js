const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.post('/login', userController.loginUser)

module.exports = router;