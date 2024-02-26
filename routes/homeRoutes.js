// routes/homeRoutes.js

const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Отображение главной страницы
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('home', { items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).render('error');
  }
});

module.exports = router;
