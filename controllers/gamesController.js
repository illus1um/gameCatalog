// controllers/gamesController.js
const axios = require('axios');

// Замените 'YOUR_API_KEY' на ваш ключ API
const API_KEY = '60124dcc40f34155a94273a274fbf0f4';
const API_URL = 'https://api.rawg.io/api/games';

module.exports.games_get = async (req, res) => {
  try {
    const { page, page_size, search, platforms } = req.query;

    // Составляем параметры запроса на основе переданных параметров
    const queryParams = {
      key: API_KEY,
      page: page || 1,
      page_size: page_size || 30,
      search,
      platforms,
    };

    // Выполняем запрос к RAWG API
    const response = await axios.get(API_URL, { params: queryParams });
    const games = response.data.results;

    // Отображаем страницу с играми и передаем данные
    res.render('games', { games });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).render('error');
  }
};