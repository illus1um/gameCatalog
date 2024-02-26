// routes/newsRoutes.js
const { Router } = require('express');
const newsController = require('../controllers/newsController');

const router = Router();

// Роут для отображения страницы с игровыми новостями
router.get('/', newsController.news_get);

module.exports = router;
