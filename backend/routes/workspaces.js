const express = require('express');
const Workspace = require('../model/Workspace');
const User = require('../model/User'); // Import User model to populate member details
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    console.log('User role:', req.user.role);
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create workspaces' });
    }

    const { name, memberIds } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Workspace name is required' });
    }

    const workspace = await Workspace.create({
      name,
      owner: req.user.id,
      members: [req.user.id, ...(memberIds || [])],
    });

    const populatedWorkspace = await Workspace.findById(workspace._id)
      .populate('members', 'username email')
      .populate('owner', 'username email');

    res.status(201).json(populatedWorkspace);
  } catch (error) {
    console.error('Workspace creation error:', error);
    res.status(500).json({ error: 'Server error creating workspace' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const workspaces = await Workspace.find({ members: req.user.id })
      .populate('members', 'username email')
      .populate('owner', 'username email')
      .populate('channels', "name"); 

    res.json(workspaces);
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    res.status(500).json({ error: 'Server error fetching workspaces' });
  }
});


module.exports = router;