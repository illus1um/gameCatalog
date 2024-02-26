// routes/gamesRoutes.js
const { Router } = require('express');
const gamesController = require('../controllers/gamesController');

const router = Router();

router.get('/', gamesController.games_get);
router.get('/details/:id', gamesController.game_details_get);

module.exports = router;
