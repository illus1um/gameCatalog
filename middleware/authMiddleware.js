const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

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
    if (token) {
      jwt.verify(token, 'illus1ve', async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          const user = await User.findById(decodedToken.id);


          if (user.role === role) {
            next();
          } else {
            res.status(403).render('error');
          }
        }
      });
    } else {
      res.redirect('/login');
    }
  };
};


module.exports = { requireAuth, checkUser, requireRole };