const express = require('express');
const Message = require('../model/Message');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.get('/channel/:id', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ to: req.params.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching channel messages:', err);
    res.status(500).json({ error: 'Server error fetching messages' });
  }
});

router.post('/message', verifyToken, async (req, res) => {
  try {
    const { to, content, scheduledFor } = req.body;

    const newMessage = new Message({
      from: req.user.id,
      to,
      content,
      scheduledFor,
      sent: !scheduledFor 
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Server error sending message' });
  }
});


router.post('/schedule', verifyToken, async (req, res) => {
  try {
    const { to, content, scheduledFor } = req.body;

    const message = new Message({
      from: req.user.id,
      to,
      content,
      scheduledFor: new Date(scheduledFor), 
      sent: false
    });

    await message.save();
    res.status(201).json({ message: 'Scheduled message created' });
  } catch (err) {
    console.error(' Schedule error:', err);
    res.status(500).json({ error: 'Failed to schedule message' });
  }
});

module.exports = router;