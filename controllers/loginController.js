const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "DAMGIACUONGDEPTRAISO1THEGIOI0777234510"; 
// Check login return a token if they match phone number and password
exports.checkLogin = async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      const user = await User.findOne({ phoneNumber });
      if (!user) {
        return res.status(401).json({ result: false, message: 'User not found', statusCode: 401 });
      }
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return res.status(401).json({ result: false, message: 'Wrong password', statusCode: 401 });
      }
      const token = jwt.sign({ userId: user.userId, phoneNumber: user.phoneNumber }, secretKey, { expiresIn: '1Y' });
      connectedSockets[user.userId] = socket.id;
      res.status(200).json({ result: true, message: token, statusCode: 200 });
    } catch (error) {
      res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
    }
 };	
 // Check phone number valid return true if it has in database
exports.checkPhone = async (req,res) =>{
	const { phoneNumber } = req.body;
    User.findOne({ phoneNumber })
        .then(user => {
            if (user) {
                res.status(200).json({ result: true, message: 'Phone number already exists', statusCode: '200' });
            } else {
                res.status(200).json({result: false, message: 'Phone number does not exist', statusCode: '200' });
            }
        })
        .catch(err => {
            res.status(500).json({result: false, message: 'Internal server error' + err, statusCode: '500'});
        });
  }
// Verify token, return true if token valid and false if invalid
exports.verifyToken = (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, secretKey);       
      const userId = decoded.userId;  
      connectedSockets[userId] = req.socketId;
      res.status(200).json({ result: true, message: 'Token is valid', statusCode: 200 });
    } catch (error) {
      res.status(401).json({ result: false, message: 'Token is invalid', statusCode: 401 });
    }
 };
 // Lấy userId từ token
exports.getUserIdFromToken = (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;  // Lấy userId từ payload của token
        res.status(200).json({ result: true, message: userId, statusCode: 200 });
    } catch (error) {
        res.status(401).json({ result: false, message: 'Token is invalid', statusCode: 401 });
    }
};
exports.disconnectUser = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, secretKey);     
    const userId = decoded.userId;  // Lấy userId từ payload của token
    res.status(200).json({ result: true, message: 'User disconnected successfully', statusCode: 200 });
  } catch (error) {
    res.status(401).json({ result: false, message: 'Token is invalid', statusCode: 401 });
  }
};

  