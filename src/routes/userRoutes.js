const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/users', userController.getAllUsers); 
router.get('/users/:id', userController.getUserById); 
router.post('/users', userController.createUser); 
router.put('/users/:id', userController.updateUser); 
router.delete('/users/:id', jwtMiddleware, userController.deleteUser);

router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

module.exports = router;
