const mongoose = require('mongoose');
const moment = require('moment-timezone'); // Thêm dòng này để import moment-timezone

const ipAddressSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => moment.tz('Asia/Ho_Chi_Minh').toDate() // Lưu thời gian ở UTC+7
    }
});

const IpAddress = mongoose.model('IpAddress', ipAddressSchema);
module.exports = IpAddress;