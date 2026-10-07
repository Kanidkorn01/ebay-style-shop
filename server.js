const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function normalizeLineId(lineId) {
  return String(lineId || '').trim().replace(/^@/, '');
}

function seedDatabase() {
  const defaultItems = [
    {
      title: 'Vintage Camera',
      price: 2500,
      description: 'Clean condition retro camera for collectors. Works great and looks amazing on display.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      line_id: 'seller123'
    },
    {
      title: 'Gaming Headset',
      price: 1200,
      description: 'Comfortable gaming headset with clear sound and strong microphone. Great for streaming or gaming.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      line_id: 'gaming_shop'
    }
  ];

  db.get('SELECT COUNT(*) AS count FROM items', (err, row) => {
    if (err) {
      console.error('Error checking items table:', err.message);
      return;
    }

    if (row.count === 0) {
      const stmt = db.prepare('INSERT INTO items (title, price, description, image, line_id, created_at) VALUES (?, ?, ?, ?, ?, datetime("now"))');
      defaultItems.forEach((item) => {
        stmt.run(item.title, item.price, item.description, item.image, normalizeLineId(item.line_id));
      });
      stmt.finalize();
    }
  });
}

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      line_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      username TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(item_id) REFERENCES items(id)
    )
  `);

  seedDatabase();
});

app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM items ORDER BY created_at DESC', [], (err, items) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!items.length) {
      return res.json([]);
    }

    const itemIds = items.map((item) => item.id);
    const placeholders = itemIds.map(() => '?').join(',');

    db.all(
      `SELECT * FROM comments WHERE item_id IN (${placeholders}) ORDER BY created_at DESC`,
      itemIds,
      (commentErr, comments) => {
        if (commentErr) {
          return res.status(500).json({ error: commentErr.message });
        }

        const commentsByItem = {};
        comments.forEach((comment) => {
          if (!commentsByItem[comment.item_id]) {
            commentsByItem[comment.item_id] = [];
          }
          commentsByItem[comment.item_id].push(comment);
        });

        const itemsWithComments = items.map((item) => ({
          ...item,
          comments: commentsByItem[item.id] || []
        }));

        res.json(itemsWithComments);
      }
    );
  });
});

app.post('/api/items', (req, res) => {
  const { title, price, description, image, lineId } = req.body;

  if (!title || !price || !description || !lineId) {
    return res.status(400).json({ error: 'Please fill in title, price, description, and Line ID.' });
  }

  const cleanLineId = normalizeLineId(lineId);
  const cleanTitle = String(title).trim();
  const cleanDescription = String(description).trim();
  const cleanImage = String(image || '').trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80';

  db.run(
    'INSERT INTO items (title, price, description, image, line_id, created_at) VALUES (?, ?, ?, ?, ?, datetime("now"))',
    [cleanTitle, Number(price), cleanDescription, cleanImage, cleanLineId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        title: cleanTitle,
        price: Number(price),
        description: cleanDescription,
        image: cleanImage,
        line_id: cleanLineId,
        comments: []
      });
    }
  );
});

app.post('/api/items/:id/comments', (req, res) => {
  const itemId = Number(req.params.id);
  const { username, message } = req.body;

  if (!itemId || !username || !message) {
    return res.status(400).json({ error: 'Username and message are required.' });
  }

  db.run(
    'INSERT INTO comments (item_id, username, message, created_at) VALUES (?, ?, ?, datetime("now"))',
    [itemId, String(username).trim(), String(message).trim()],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        item_id: itemId,
        username: String(username).trim(),
        message: String(message).trim()
      });
    }
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Marketplace app running on http://localhost:${PORT}`);
});
