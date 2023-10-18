const mongoose = require('mongoose');
const RelationshipSchema = new mongoose.Schema({
    requester: { type: String, required: true },  // ID của người dùng thứ nhất trong mối quan hệ
    recipient: { type: String, required: true },  // ID của người dùng thứ hai trong mối quan hệ
    status: { type: String, required: true, enum: ['pending', 'accepted', 'declined'] },  // Trạng thái của mối quan hệ: 'pending', 'accepted', 'declined'
    created_at: { type: Date, default: Date.now },  // Thời điểm mối quan hệ được tạo
    updated_at: { type: Date, default: Date.now }, // Thời điểm mối quan hệ được cập nhật gần nhất
    deleted: { type: Boolean, default: false }, 
 });
module.exports = mongoose.model('Relationships', RelationshipSchema);