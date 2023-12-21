const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const {validateUser, validateUpdateUser} = require('../middlewares/validateUserMiddleware');

router.get('/users', jwtMiddleware,  userController.getAllUsers); 
router.get('/users/:id', jwtMiddleware, userController.getUserById); 
router.post('/users', jwtMiddleware, validateUser, userController.createUser); 
router.put('/users/:id', jwtMiddleware, validateUpdateUser, userController.updateUser); 
router.delete('/users/:id', jwtMiddleware, userController.deleteUser);

router.post('/login', userController.loginUser);

module.exports = router;
