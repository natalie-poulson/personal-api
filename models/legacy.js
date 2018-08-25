const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const legacySchema = new Schema({
name: String,
address: String,
yearOpened: Number,
stillInBusiness: Boolean
});

const Legacy = mongoose.model('Legacy', legacySchema);

module.exports = Legacy;
