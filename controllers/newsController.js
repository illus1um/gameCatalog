// controllers/newsController.js
const axios = require('axios');

const API_KEY = '2a5b3ff3dfa44f57af65878b2d80ffb8';
const API_URL = 'https://newsapi.org/v2/everything';

module.exports.news_get = async (req, res) => {
    try {
      // Выполняем запрос к NewsAPI для получения игровых новостей
      const response = await axios.get(API_URL, {
        params: {
          apiKey: API_KEY,
          q: 'steam, RPG, entertainment',
          language: 'en', // Язык новостей (английский)
          sortBy: 'publishedAt', // Сортировка по дате публикации
          pageSize: 30 // Количество новостей на странице
        }
      });
  
      // Получаем список новостей из ответа
      const newsArticles = response.data.articles;
  
      // Отображаем страницу с игровыми новостями и передаем данные
      res.render('game_news', { newsArticles });
    } catch (error) {
      console.error('Error fetching game news:', error);
      res.status(500).render('error');
    }
  };