const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopshowcase';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

function normalizeLineId(lineId) {
  return String(lineId || '').trim().replace(/^@/, '');
}

const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'
    },
    lineId: {
      type: String,
      required: true,
      trim: true,
      set: (value) => normalizeLineId(value)
    },
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

async function connectDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      dbName: process.env.MONGODB_DB_NAME || undefined
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

async function seedDatabase() {
  const count = await Item.countDocuments();
  if (count > 0) return;

  await Item.insertMany([
    {
      title: 'Vintage Camera',
      price: 2500,
      description: 'Clean condition retro camera for collectors. Works great and looks amazing on display.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      lineId: 'seller123',
      comments: [{ username: 'A', message: 'Very nice piece!' }]
    },
    {
      title: 'Gaming Headset',
      price: 1200,
      description: 'Comfortable gaming headset with clear sound and strong microphone. Great for streaming or gaming.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      lineId: 'gaming_shop',
      comments: [{ username: 'B', message: 'Is this still available?' }]
    }
  ]);
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  const { title, price, description, image, lineId } = req.body;

  if (!title || !price || !description || !lineId) {
    return res.status(400).json({ error: 'Please fill in title, price, description, and Line ID.' });
  }

  try {
    const newItem = await Item.create({
      title: String(title).trim(),
      price: Number(price),
      description: String(description).trim(),
      image: String(image || '').trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      lineId: normalizeLineId(lineId),
      comments: []
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/items/:id/comments', async (req, res) => {
  const itemId = req.params.id;
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Username and message are required.' });
  }

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found.' });
    }

    const newComment = {
      username: String(username).trim(),
      message: String(message).trim()
    };

    item.comments.push(newComment);
    await item.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

connectDatabase()
  .then(() => seedDatabase())
  .catch((error) => {
    console.error('Startup DB error:', error.message);
  });

module.exports = app;
