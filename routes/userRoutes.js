const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
router.post('/addUser', userController.addUser);
router.post('/checkIdExist', userController.checkIdExist);
router.post('/checkPhoneNumber',userController.checkPhoneNumber);
router.post('/searchUser',userController.searchUser)
module.exports = router;