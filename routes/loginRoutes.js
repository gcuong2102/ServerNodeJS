const express = require('express');
const loginController = require('../controllers/loginController')
const router = express.Router();
router.post('/checkLogin', loginController.checkLogin)
router.post('/verifyToken',loginController.verifyToken)
router.post('/checkPhone',loginController.checkPhone)
router.post('/getUserIdFromToken', loginController.getUserIdFromToken);
router.post('/disconnectUser',loginController.disconnectUser)
module.exports = router;