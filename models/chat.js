const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    author: { type: String, require: true },
    text: { type: String, require: true },
    hour: { type: String, require: true }
});

const Chat = mongoose.model('chat', ChatSchema);
module.exports = Chat;