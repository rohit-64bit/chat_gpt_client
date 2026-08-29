require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chats');
const folderRoutes = require('./routes/folders');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chats', chatRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', require('./routes/payment'));

// Default route
app.get('/', (req, res) => {
  res.send('ChatGPT Clone API is running');
});

// Database connection
const connectDB = async () => {
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('dummy')) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  } else {
    console.log('Dummy MONGODB_URI detected. Starting in-memory MongoDB for local development...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log(`Connected to in-memory MongoDB at ${mongoUri}`);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
