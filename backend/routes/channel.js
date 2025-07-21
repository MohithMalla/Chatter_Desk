// const express = require('express');
// const Channel = require('../model/Channel');
// const Workspace = require('../model/Workspace');
// const verifyToken = require('../utils/verifyToken');

// const router = express.Router();

// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const { name, members, workspaceId } = req.body;

//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ error: 'Only admins can create channels' });
//     }

//     if (!workspaceId || !name || !members || !members.length) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const channel = await Channel.create({
//       name,
//       members,
//       workspace: workspaceId,
//       createdBy: req.user.id
//     });

//     await Workspace.findByIdAndUpdate(workspaceId, {
//       $push: { channels: channel._id }
//     });

//     res.status(201).json(channel);
//   } catch (error) {
//     console.error('Channel creation failed:', error);
//     res.status(500).json({ error: 'Server error creating channel' });
//   }
// });

// router.get('/', verifyToken, async (req, res) => {
//   try {
//     const workspaceId = req.query.workspaceId;

//     const filter = {
//       members: req.user.id,
//       ...(workspaceId ? { workspace: workspaceId } : {})
//     };

//     const channels = await Channel.find(filter)
//       .populate('members', 'username email')
//       .populate('workspace', 'name')
//       .sort({ createdAt: -1 });

//     res.json(channels);
//   } catch (error) {
//     console.error('Failed to fetch channels:', error);
//     res.status(500).json({ error: 'Server error fetching channels' });
//   }
// });

// module.exports = router;

const express = require('express');
const Channel = require('../model/Channel');
const Workspace = require('../model/Workspace');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

// Create a new channel (Admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, members, workspaceId } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create channels' });
    }

    if (!workspaceId || !name || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const channel = await Channel.create({
      name,
      members,
      workspace: workspaceId,
      createdAt: new Date(),
    });

    await Workspace.findByIdAndUpdate(workspaceId, {
      $push: { channels: channel._id }
    });

    res.status(201).json(channel);
  } catch (error) {
    console.error('Channel creation failed:', error);
    res.status(500).json({ error: 'Server error creating channel' });
  }
});

// Get all channels 
router.get('/', verifyToken, async (req, res) => {
  try {
    const workspaceId = req.query.workspaceId;

    const filter = {
  members: { $in: [req.user.id] },
  ...(workspaceId && { workspace: workspaceId })
};

const channels = await Channel.find(filter)
  .populate('members', 'username email')
  .populate('workspace', 'name')
  .sort({ createdAt: -1 });

    res.json(channels);
  } catch (error) {
    console.error('Failed to fetch channels:', error);
    res.status(500).json({ error: 'Server error fetching channels' });
  }
});

// GET /api/channels/workspaceId/
router.get('/workspace/:workspaceId', verifyToken, async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const workspace = await Workspace.findById(workspaceId).populate('members');

    if (!workspace) return res.status(404).json({ message: 'Workspace not found' });

    const isMember = workspace.members.some(
      (member) => member._id.toString() === req.user.id
    );
    if (!isMember) return res.status(403).json({ message: 'Unauthorized' });

    const channels = await Channel.find({ workspace: workspaceId });
    res.status(200).json(channels);
  } catch (err) {
    console.error('Fetch channel error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




module.exports = router;