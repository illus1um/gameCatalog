// routes/gamesRoutes.js
const { Router } = require('express');
const gamesController = require('../controllers/gamesController');

const router = Router();

router.get('/', gamesController.games_get);

module.exports = router;
