// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Отображение административной панели
router.get('/', adminController.admin_get);

// Добавление нового элемента (GET)
router.get('/add', adminController.add_item_get);

// Добавление нового элемента (POST)
router.post('/add', adminController.add_item_post);

// Редактирование элемента (GET)
router.get('/edit/:id', adminController.edit_item_get);

// Редактирование элемента (POST)
router.post('/edit/:id', adminController.edit_item_post);

// Удаление элемента (GET)
router.get('/delete/:id', adminController.delete_item_get);

// Удаление элемента (POST)
router.post('/delete/:id', adminController.delete_item_post);

module.exports = router;
