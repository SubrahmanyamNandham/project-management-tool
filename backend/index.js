const express =require('express');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const projectRoutes = require('./routes/projects');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app =express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Content-Type:', req.headers['content-type']);
  next();
});

app.use(express.json()); // Add limit if needed
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*'
}));
app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/krisptool', {
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
