const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: false },
    passwordHash: { type: String, required: true },
    joinDate: { type: Number, required: true },
    isOnline: { type: Boolean, required: true },
    lastActiveTime: { type: Number, required: true },
    name: { type: String, required: true },
    birthDate: { type: Number, required: false },
    profileImageUrl: { type: String, required: false },
    description: { type: String, required: false },
    nickname: { type: String, required: false }
});
module.exports = mongoose.model('Users', UserSchema);