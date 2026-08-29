const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const { GoogleGenAI } = require('@google/genai');

let ai;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// Get all chats for the logged-in user (hardcoded to 'default-user' for now)
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find({ userId: null }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new chat
router.post('/', async (req, res) => {
  try {
    const { folderId } = req.body || {};
    const newChat = new Chat({
      title: 'New Chat',
      userId: null,
      folderId: folderId || null
    });
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages for a specific chat
router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a message to a chat
router.post('/:id/messages', async (req, res) => {
  try {
    const { content } = req.body;
    const chatId = req.params.id;

    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    if (!ai) {
      return res.status(500).json({ error: 'Gemini API is not configured on the server.' });
    }

    // 1. Save user message to DB
    const userMessage = new Message({
      chatId,
      role: 'user',
      content
    });
    await userMessage.save();

    // Update chat timestamp and title if it's the first message
    const chat = await Chat.findById(chatId);
    if (chat && chat.title === 'New Chat') {
      // Very basic title generation (just take first few words)
      chat.title = content.split(' ').slice(0, 4).join(' ') + '...';
    }
    if (chat) {
      chat.updatedAt = new Date();
      await chat.save();
    }

    // 2. Fetch history for Gemini context
    const history = await Message.find({ chatId }).sort({ createdAt: 1 });
    
    // Format history for Gemini SDK
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // 3. Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents
    });

    const aiContent = response.text;

    // 4. Save AI response to DB
    const aiMessage = new Message({
      chatId,
      role: 'model',
      content: aiContent
    });
    await aiMessage.save();

    res.status(201).json({
      userMessage,
      aiMessage
    });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
