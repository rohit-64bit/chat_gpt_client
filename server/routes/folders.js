const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const Chat = require('../models/Chat');

// Get all folders for the logged-in user
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find({ userId: null }).sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new folder
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newFolder = new Folder({
      name: name || 'New Folder',
      userId: null
    });
    const savedFolder = await newFolder.save();
    res.status(201).json(savedFolder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all chats in a specific folder
router.get('/:id/chats', async (req, res) => {
  try {
    const chats = await Chat.find({ folderId: req.params.id }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
