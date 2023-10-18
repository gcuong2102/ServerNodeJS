const User = require('../models/Users');
const Relationship = require('../models/Relationships');
// API for sending a friend request by Id.
exports.sendFriendRequest = async (req, res) => {
    try {
      const { requesterId, recipientId } = req.body;
      // Check if the recipient exists
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({ result: false, message: 'Recipient not found.', statusCode: 404 });
      }
      // Check if a relationship already exists between the two users
      const existingRelationship = await Relationship.findOne({
        $or: [
          { requester: requesterId, recipient: recipientId },
          { requester: recipientId, recipient: requesterId }
        ]
      });
      if (existingRelationship) {
        return res.status(400).json({ result: false, message: 'Friend request already sent or you are already friends.', statusCode: 400 });
      }
      // Create new relationship
      const newRelationship = new Relationship({
        requester: requesterId,
        recipient: recipientId,
        status: 'Pending'
      });
      await newRelationship.save();
      res.status(200).json({ result: true, message: 'Friend request sent successfully.', statusCode: 200 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
    }
};
// Listing all friend requests
exports.listFriendRequests = async (req, res) => {
    try {
      const { userId } = req.params;
      
      const friendRequests = await Relationship.find({
        recipient: userId,
        status: 'Pending'
      }).populate('requester', 'name');  // Assuming 'name' is a field in the User model
      
      res.status(200).json({ result: true, message: friendRequests, statusCode: 200 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
    }
};
// Listing all friend
exports.getFriendsList = async (req, res) => {	
    try {
        const userId = req.body.userId;  // Lấy ID của người dùng từ request body

        // Tìm tất cả mối quan hệ đã được chấp nhận có chứa ID của người dùng
        const relationships = await Relationship.find({
            $or: [{ requester: userId }, { recipient: userId }],
            status: 'accepted'
        });

        // Trích xuất ID của bạn bè từ các mối quan hệ
        const friendIds = relationships.map(rel => {
            return rel.requester === userId ? rel.recipient : rel.requester;
        });

        // Tìm thông tin chi tiết của bạn bè dựa trên các ID đã trích xuất
        const friendsDetails = await User.find({
            'userId': { $in: friendIds }
        });

        // Trả về danh sách bạn bè chi tiết
        res.status(200).json({ result: true, friends: friendsDetails, statusCode: 200 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
    }
};
// API để chấp nhận lời mời kết bạn
exports.acceptFriendRequest = async (req, res) => {
    try {
      const { requesterId, recipientId } = req.body;
  
      const relationship = await Relationship.findOneAndUpdate(
        {
          $or: [
            { requester: requesterId, recipient: recipientId },
            { requester: recipientId, recipient: requesterId }
          ],
          status: 'pending'
        },
        { status: 'accepted', updated_at: Date.now() },
        { new: true }
      );
  
      if (!relationship) {
        return res.status(404).json({ result: false, message: 'Friend request not found or already accepted.', statusCode: 404 });
      }
  
      res.status(200).json({ result: true, message: 'Friend request accepted.', statusCode: 200 });
    } catch (error) {
      res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
    }
};
  // API để từ chối lời mời kết bạn
exports.declineFriendRequest = async (req, res) => {
    try {
      const { requesterId, recipientId } = req.body;
  
      const relationship = await Relationship.findOneAndUpdate(
        {
          $or: [
            { requester: requesterId, recipient: recipientId },
            { requester: recipientId, recipient: requesterId }
          ],
          status: 'pending'
        },
        { status: 'declined', updated_at: Date.now() },
        { new: true }
      );
  
      if (!relationship) {
        return res.status(404).json({ result: false, message: 'Friend request not found or already declined.', statusCode: 404 });
      }
  
      res.status(200).json({ result: true, message: 'Friend request declined.', statusCode: 200 });
    } catch (error) {
      res.status(500).json({ result: false, message: 'Server Error', statusCode: 500 });
    }
};