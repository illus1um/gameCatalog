const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'illus1ve', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'illus1ve', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;

    // Проверяем наличие и валидность токена
    if (token) {
      jwt.verify(token, 'illus1ve', async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          // Получаем пользователя из базы данных по id из токена
          const user = await User.findById(decodedToken.id);

          // Проверяем роль пользователя
          if (user.role === role) {
            next();
          } else {
            res.status(403).render('error'); // Ошибка 403: Доступ запрещен
          }
        }
      });
    } else {
      res.redirect('/login');
    }
  };
};


module.exports = { requireAuth, checkUser, requireRole };