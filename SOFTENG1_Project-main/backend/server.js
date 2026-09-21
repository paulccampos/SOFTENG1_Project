require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function startServer() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } else {
    console.log('MONGODB_URI is not set; starting without a database connection');
  }

  app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start API server:', error.message);
  process.exit(1);
});