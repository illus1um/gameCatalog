const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const gamesRoutes = require('./routes/gamesRoutes');
const newsRoutes = require('./routes/newsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require('./routes/homeRoutes.js')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, requireRole} = require('./middleware/authMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://illus1ve:1q2w3e4r5t@cluster0.zo5qkc6.mongodb.net/gameCatalog';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser);
app.get('/', homeRoutes);
app.use('/games', requireAuth, gamesRoutes);
app.use('/news', requireAuth, newsRoutes);
app.use('/admin', requireAuth, requireRole('admin'), adminRoutes);
app.use(authRoutes);