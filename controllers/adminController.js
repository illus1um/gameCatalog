const Item = require('../models/item');

module.exports.admin_get = async (req, res) => {
  try {
    const items = await Item.find();
    res.render('admin', { items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).render('error');
  }
};

module.exports.add_item_get = (req, res) => {
  res.render('add_item');
};

module.exports.add_item_post = async (req, res) => {
  const { picture, nameRU, nameEN, descriptionRU, descriptionEN } = req.body;
  try {
    await Item.create({ picture, nameRU, nameEN, descriptionRU, descriptionEN });
    res.redirect('/admin');
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).render('error');
  }
};

module.exports.edit_item_get = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    res.render('edit_item', { item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).render('error');
  }
};

module.exports.edit_item_post = async (req, res) => {
  const { id } = req.params;
  const { picture, nameRU, nameEN, descriptionRU, descriptionEN } = req.body;
  try {
    await Item.findByIdAndUpdate(id, { picture, nameRU, nameEN, descriptionRU, descriptionEN });
    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).render('error');
  }
};

module.exports.delete_item_get = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    res.render('delete_item', { item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).render('error');
  }
};

module.exports.delete_item_post = async (req, res) => {
  const { id } = req.params;
  try {
    await Item.findByIdAndDelete(id);
    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).render('error');
  }
};
