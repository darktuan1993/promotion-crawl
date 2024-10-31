const mongoose = require('mongoose');

const ipAddressSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const IpAddress = mongoose.model('IpAddress', ipAddressSchema);
module.exports = IpAddress;