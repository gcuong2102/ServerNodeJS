const mongoose = require('mongoose');
const OtpInfoSchema = new mongoose.Schema({
    otpId: { type: String, required: true },         // Một ID duy nhất cho mỗi OTP, bạn có thể sử dụng UUID hoặc một cơ chế khác
    otpValue: { type: String, required: true },     // Giá trị OTP
    phoneNumber: { type: String, required: true },       // ID người dùng hoặc số điện thoại
    creationTime: { type: String, required: true },   // Ngày và giờ tạo dưới dạng timestamp
    expirationTime: { type: String, required: true },   // Thời gian hết hạn dưới dạng timestamp
    status: { type: String, required: true },   // Trạng thái của OTP, bạn có thể sử dụng chuỗi hoặc số nguyên
    attempts: Int = { type: String, required: true },           // Số lần thử nhập OTP
    transactionId: { type: String, required: true } // Mã định danh giao dịch (nếu có)
});
module.exports = mongoose.model('OtpInfo',OtpInfoSchema);