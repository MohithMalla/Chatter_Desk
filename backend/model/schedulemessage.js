const mongoose = require('mongoose');

const scheduledMessageSchema = new mongoose.Schema({
  fromId: { type: String, required: true },
  toId: { type: String, required: true },
  content: { type: String, required: true },
  workspaceId: { type: String, required: true },
  isGroup: { type: Boolean, default: false },
  sendTime: { type: String, required: true }, //  YYYY-MM-DDTHH:mm
});

module.exports = mongoose.model('ScheduledMessage', scheduledMessageSchema);