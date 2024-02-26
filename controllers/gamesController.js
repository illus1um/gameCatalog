const axios = require('axios');

const API_KEY = '60124dcc40f34155a94273a274fbf0f4';
const API_URL = 'https://api.rawg.io/api/games';

module.exports.games_get = async (req, res) => {
  try {
    const { page, page_size, search, platforms } = req.query;

    const queryParams = {
      key: API_KEY,
      page: page || 1,
      page_size: page_size || 20,
      search,
      platforms,
    };

    const response = await axios.get(API_URL, { params: queryParams });
    const { results, count, next, previous } = response.data;

    const totalPages = Math.ceil(count / queryParams.page_size);

    res.render('games', { 
      games: results,
      currentPage: parseInt(queryParams.page),
      totalPages,
      nextPage: next,
      prevPage: previous,
      searchQuery: search,
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).render('error');
  }
};

module.exports.game_details_get = async (req, res) => {
  try {
    const gameId = req.params.id;
    const response = await axios.get(`${API_URL}/${gameId}`, {
      params: { key: API_KEY }
    });
    
    const game = response.data;

    res.render('game_details', { game });
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).render('error');
  }
};

