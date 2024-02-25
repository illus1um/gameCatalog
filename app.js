const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, requireRole} = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://illus1ve:1q2w3e4r5t@cluster0.zo5qkc6.mongodb.net/gameCatalog';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/games', requireAuth, (req, res) => res.render('games'));
app.get('/admin', requireAuth, requireRole('admin'), (req, res) => {res.render('admin');});
app.use(authRoutes);