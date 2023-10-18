const express = require('express');
const relationshipController = require('../controllers/relationshipController')
const router = express.Router();
router.post('/sendFriendRequest',relationshipController.sendFriendRequest);
router.post('/listFriendRequests',relationshipController.listFriendRequests);
router.post('/getFriendsList',relationshipController.getFriendsList);
router.post('/acceptFriendRequest',relationshipController.acceptFriendRequest);
router.post('/declineFriendRequest',relationshipController.declineFriendRequest);
module.exports = router