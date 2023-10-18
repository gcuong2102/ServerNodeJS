const User = require('../models/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addUser = async (req, res) => {
  try {
    const { passwordHash } = req.body;
    const hashedPassword = await bcrypt.hash(passwordHash, saltRounds);
    const newUser = new User({
      ...req.body,
      passwordHash: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json({ result: true, message: user, statusCode: 200 });

  } catch (error) {
	  console.log(error)
    res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
  }
};
exports.checkIdExist = async (req,res) => {
    const { userId } = req.body;
    User.findOne({ userId })
        .then(user => {
            if(user){
                res.status(200).json({ result: false, message: '', statusCode: '200' });
            }else{
                res.status(200).json({ result: true, message: '', statusCode: '200' });
            }

        })
        .catch(err=>{
            res.status(500).json({result: false, message: 'Internal server error' + err, statusCode: '500'});
        })
}
exports.checkPhoneNumber = async(req,res) => {
    const { phoneNumber } = req.body;
    User.findOne({ phoneNumber })
        .then(user => {
            if (user) {
                res.status(200).json({ result: false, message: 'Phone number already exists', statusCode: '200' });
            } else {
                res.status(200).json({result: true, message: 'Phone number does not exist', statusCode: '200' });
            }
        })
        .catch(err => {
            res.status(500).json({result: false, message: 'Internal server error' + err, statusCode: '500'});
        });
}
exports.searchUser = async (req, res) => {
  try {
    const { query } = req.body;
    // Search by ID or phone number
    const user = await User.findOne({ $or: [{ userId: query }, { phoneNumber: query }] });
    if (!user) {
      return res.status(404).json({ result: false, message: 'User not found', statusCode: 404 });
    }
    // Return user details
    res.status(200).json({ result: true, message: user, statusCode: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
  }
};