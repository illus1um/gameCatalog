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
      page_size: page_size || 24,
      search,
      platforms,
    };

    // Выполняем запрос к RAWG API
    const response = await axios.get(API_URL, { params: queryParams });
    const { results, count, next, previous } = response.data;

    // Вычисляем количество страниц
    const totalPages = Math.ceil(count / queryParams.page_size);

    // Передаем данные о играх и пагинации в представление
    res.render('games', { 
      games: results,
      currentPage: parseInt(queryParams.page),
      totalPages,
      nextPage: next,
      prevPage: previous,
      searchQuery: search, // Передаем поисковой запрос для отображения в форме
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).render('error');
  }
};

